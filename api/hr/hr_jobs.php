<?php
/**
 * HR Jobs Management Backend
 * Handles job posting, editing, and management for HR
 */
declare(strict_types=1);

require_once '../config.php';
require_once '../validation.php';
define('HR_AUTH_LIBRARY_ONLY', true);
require_once 'hr_auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'] ?? '', '/'));

switch ($method) {
    case 'GET':
        if (isset($request[1]) && is_numeric($request[1])) {
            hrGetJob((int)$request[1]);
        } else {
            hrGetJobs();
        }
        break;
    
    case 'POST':
        hrAuthenticateRequest();
        hrCreateJob();
        break;
    
    case 'PUT':
        hrAuthenticateRequest();
        if (isset($request[1]) && is_numeric($request[1])) {
            hrUpdateJob((int)$request[1]);
        } else {
            respondError(400, 'Job ID required');
        }
        break;
    
    case 'DELETE':
        hrAuthenticateRequest();
        if (isset($request[1]) && is_numeric($request[1])) {
            hrDeleteJob((int)$request[1]);
        } else {
            respondError(400, 'Job ID required');
        }
        break;
    
    default:
        respondError(405, 'Method not allowed');
}

function hrGetJobs(): void {
    try {
        $pdo = getDBConnection();
        
        $status = $_GET['status'] ?? null;
        $search = $_GET['search'] ?? null;
        $page = (int)($_GET['page'] ?? 1);
        $limit = (int)($_GET['limit'] ?? 10);
        $offset = ($page - 1) * $limit;
        
        $where = [];
        $params = [];
        
        if ($status) {
            $where[] = "j.status = ?";
            $params[] = $status;
        }
        
        if ($search) {
            $where[] = "(j.title LIKE ? OR j.description LIKE ? OR j.category LIKE ?)";
            $params[] = "%{$search}%";
            $params[] = "%{$search}%";
            $params[] = "%{$search}%";
        }
        
        $whereClause = !empty($where) ? "WHERE " . implode(" AND ", $where) : "";
        
        // Count total
        $countSql = "SELECT COUNT(*) FROM jobs j {$whereClause}";
        $countStmt = $pdo->prepare($countSql);
        $countStmt->execute($params);
        $total = (int)$countStmt->fetchColumn();
        
        // Get paginated jobs
        $sql = "SELECT j.*, COUNT(DISTINCT a.application_id) as application_count, COUNT(DISTINCT i.interview_id) as interview_count 
                FROM jobs j 
                LEFT JOIN applications a ON j.job_id = a.job_id 
                LEFT JOIN interviews i ON i.application_id = (
                    SELECT application_id FROM applications WHERE job_id = j.job_id LIMIT 1
                )
                {$whereClause}
                GROUP BY j.job_id 
                ORDER BY j.created_at DESC 
                LIMIT ? OFFSET ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([...$params, $limit, $offset]);
        $jobs = $stmt->fetchAll();
        
        respondSuccess([
            'items' => $jobs,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => (int)ceil($total / $limit)
            ]
        ], 'Jobs retrieved successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to retrieve jobs', ['error' => $e->getMessage()]);
    }
}

function hrGetJob(int $id): void {
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare(
            "SELECT j.*, 
                    COUNT(DISTINCT a.application_id) as application_count,
                    COUNT(DISTINCT CASE WHEN a.status = 'Shortlisted' THEN a.application_id END) as shortlisted_count,
                    COUNT(DISTINCT CASE WHEN a.status = 'Interview Scheduled' THEN a.application_id END) as interview_count
             FROM jobs j 
             LEFT JOIN applications a ON j.job_id = a.job_id 
             WHERE j.job_id = ? 
             GROUP BY j.job_id"
        );
        $stmt->execute([$id]);
        $job = $stmt->fetch();
        
        if (!$job) {
            respondError(404, 'Job not found');
        }
        
        // Get job skills
        $skillStmt = $pdo->prepare("SELECT * FROM job_skills WHERE job_id = ?");
        $skillStmt->execute([$id]);
        $job['skills'] = $skillStmt->fetchAll();
        
        respondSuccess($job, 'Job retrieved successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to retrieve job', ['error' => $e->getMessage()]);
    }
}

function hrCreateJob(): void {
    try {
        $payload = hrAuthenticateRequest();
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        // Validate
        Validator::reset();
        Validator::required($data['title'] ?? '', 'title');
        Validator::required($data['description'] ?? '', 'description');
        Validator::required($data['requirements'] ?? '', 'requirements');
        Validator::required($data['category'] ?? '', 'category');
        
        if (Validator::hasErrors()) {
            respondError(400, 'Validation failed', Validator::getErrors());
        }
        
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare(
            "INSERT INTO jobs (
                title, description, requirements, category, location, 
                salary_range, experience_required, status, expiration_date, created_by
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        );
        
        $stmt->execute([
            $data['title'],
            $data['description'],
            $data['requirements'],
            $data['category'],
            $data['location'] ?? 'Remote',
            $data['salary_range'] ?? null,
            $data['experience_required'] ?? 0,
            'active',
            $data['expiration_date'] ?? date('Y-m-d', strtotime('+30 days')),
            $payload['user_id']
        ]);
        
        $jobId = (int)$pdo->lastInsertId();
        
        // Add skills if provided
        if (!empty($data['skills']) && is_array($data['skills'])) {
            $skillStmt = $pdo->prepare("INSERT INTO job_skills (job_id, skill_name, required_level) VALUES (?, ?, ?)");
            foreach ($data['skills'] as $skill) {
                $skillStmt->execute([
                    $jobId,
                    $skill['name'] ?? $skill,
                    $skill['level'] ?? 'intermediate'
                ]);
            }
        }
        
        respondCreated(['job_id' => $jobId], 'Job posted successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to create job', ['error' => $e->getMessage()]);
    }
}

function hrUpdateJob(int $id): void {
    try {
        $payload = hrAuthenticateRequest();
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        $pdo = getDBConnection();
        
        // Check job exists and belongs to user
        $checkStmt = $pdo->prepare("SELECT job_id, created_by FROM jobs WHERE job_id = ?");
        $checkStmt->execute([$id]);
        $job = $checkStmt->fetch();
        
        if (!$job) {
            respondError(404, 'Job not found');
        }
        
        if ($job['created_by'] != $payload['user_id'] && $payload['role'] !== 'admin') {
            respondError(403, 'Unauthorized to update this job');
        }
        
        // Update job
        $updates = [];
        $params = [];
        
        $fields = ['title', 'description', 'requirements', 'category', 'location', 'salary_range', 'experience_required', 'status', 'expiration_date'];
        foreach ($fields as $field) {
            if (isset($data[$field])) {
                $updates[] = "{$field} = ?";
                $params[] = $data[$field];
            }
        }
        
        if (!empty($updates)) {
            $params[] = $id;
            $sql = "UPDATE jobs SET " . implode(", ", $updates) . " WHERE job_id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
        }
        
        // Update skills if provided
        if (isset($data['skills']) && is_array($data['skills'])) {
            $pdo->prepare("DELETE FROM job_skills WHERE job_id = ?")->execute([$id]);
            $skillStmt = $pdo->prepare("INSERT INTO job_skills (job_id, skill_name, required_level) VALUES (?, ?, ?)");
            foreach ($data['skills'] as $skill) {
                $skillStmt->execute([
                    $id,
                    $skill['name'] ?? $skill,
                    $skill['level'] ?? 'intermediate'
                ]);
            }
        }
        
        respondSuccess(['job_id' => $id], 'Job updated successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to update job', ['error' => $e->getMessage()]);
    }
}

function hrDeleteJob(int $id): void {
    try {
        $payload = hrAuthenticateRequest();
        $pdo = getDBConnection();
        
        $checkStmt = $pdo->prepare("SELECT job_id, created_by FROM jobs WHERE job_id = ?");
        $checkStmt->execute([$id]);
        $job = $checkStmt->fetch();
        
        if (!$job) {
            respondError(404, 'Job not found');
        }
        
        if ($job['created_by'] != $payload['user_id'] && $payload['role'] !== 'admin') {
            respondError(403, 'Unauthorized to delete this job');
        }
        
        $pdo->prepare("DELETE FROM job_skills WHERE job_id = ?")->execute([$id]);
        $pdo->prepare("DELETE FROM jobs WHERE job_id = ?")->execute([$id]);
        
        respondSuccess(['job_id' => $id], 'Job deleted successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to delete job', ['error' => $e->getMessage()]);
    }
}
