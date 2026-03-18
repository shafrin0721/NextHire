<?php
/**
 * HR Applications Management Backend
 * Handles viewing and managing applications for HR
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
            hrGetApplication((int)$request[1]);
        } else {
            hrGetApplications();
        }
        break;
    
    case 'PUT':
        hrAuthenticateRequest();
        if (isset($request[1]) && is_numeric($request[1])) {
            if (isset($request[2]) && $request[2] === 'status') {
                hrUpdateApplicationStatus((int)$request[1]);
            } else {
                hrUpdateApplication((int)$request[1]);
            }
        } else {
            respondError(400, 'Application ID required');
        }
        break;
    
    default:
        respondError(405, 'Method not allowed');
}

function hrGetApplications(): void {
    try {
        $pdo = getDBConnection();
        
        $jobId = $_GET['job_id'] ?? null;
        $status = $_GET['status'] ?? null;
        $search = $_GET['search'] ?? null;
        $page = (int)($_GET['page'] ?? 1);
        $limit = (int)($_GET['limit'] ?? 10);
        $offset = ($page - 1) * $limit;
        
        $where = [];
        $params = [];
        
        if ($jobId) {
            $where[] = "a.job_id = ?";
            $params[] = (int)$jobId;
        }
        
        if ($status) {
            $where[] = "a.status = ?";
            $params[] = $status;
        }
        
        if ($search) {
            $where[] = "(u.full_name LIKE ? OR u.email LIKE ?)";
            $params[] = "%{$search}%";
            $params[] = "%{$search}%";
        }
        
        $whereClause = !empty($where) ? "WHERE " . implode(" AND ", $where) : "";
        
        // Count total
        $countSql = "SELECT COUNT(*) FROM applications a {$whereClause}";
        $countStmt = $pdo->prepare($countSql);
        $countStmt->execute($params);
        $total = (int)$countStmt->fetchColumn();
        
        // Get paginated applications
        $sql = "SELECT a.application_id, a.status, a.match_percentage, a.skill_score, a.applied_at,
                       j.job_id, j.title as job_title, j.category,
                       u.user_id, u.full_name, u.email, u.phone, u.profile_photo,
                       cp.experience_years
                FROM applications a 
                LEFT JOIN jobs j ON a.job_id = j.job_id 
                LEFT JOIN users u ON a.candidate_id = u.user_id 
                LEFT JOIN candidate_profiles cp ON u.user_id = cp.candidate_id 
                {$whereClause}
                ORDER BY a.applied_at DESC 
                LIMIT ? OFFSET ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([...$params, $limit, $offset]);
        $applications = $stmt->fetchAll();
        
        respondSuccess([
            'items' => $applications,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => (int)ceil($total / $limit)
            ]
        ], 'Applications retrieved successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to retrieve applications', ['error' => $e->getMessage()]);
    }
}

function hrGetApplication(int $id): void {
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare(
            "SELECT a.*, 
                    j.job_id, j.title as job_title, j.category, j.description,
                    u.user_id, u.full_name, u.email, u.phone, u.profile_photo,
                    cp.experience_years, cp.education, cp.portfolio_link
             FROM applications a 
             LEFT JOIN jobs j ON a.job_id = j.job_id 
             LEFT JOIN users u ON a.candidate_id = u.user_id 
             LEFT JOIN candidate_profiles cp ON u.user_id = cp.candidate_id 
             WHERE a.application_id = ?"
        );
        $stmt->execute([$id]);
        $application = $stmt->fetch();
        
        if (!$application) {
            respondError(404, 'Application not found');
        }
        
        // Get candidate skills
        $skillStmt = $pdo->prepare(
            "SELECT DISTINCT js.skill_name FROM job_skills js WHERE js.job_id = ?"
        );
        $skillStmt->execute([$application['job_id']]);
        $application['required_skills'] = array_column($skillStmt->fetchAll(), 'skill_name');
        
        respondSuccess($application, 'Application retrieved successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to retrieve application', ['error' => $e->getMessage()]);
    }
}

function hrUpdateApplication(int $id): void {
    try {
        hrAuthenticateRequest();
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        $pdo = getDBConnection();
        
        // Check application exists
        $checkStmt = $pdo->prepare("SELECT application_id FROM applications WHERE application_id = ?");
        $checkStmt->execute([$id]);
        if (!$checkStmt->fetch()) {
            respondError(404, 'Application not found');
        }
        
        // Update application
        $updates = [];
        $params = [];
        
        $fields = ['match_percentage', 'skill_score', 'anonymous_mode'];
        foreach ($fields as $field) {
            if (isset($data[$field])) {
                $updates[] = "{$field} = ?";
                $params[] = $data[$field];
            }
        }
        
        if (!empty($updates)) {
            $params[] = $id;
            $sql = "UPDATE applications SET " . implode(", ", $updates) . " WHERE application_id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
        }
        
        respondSuccess(['application_id' => $id], 'Application updated successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to update application', ['error' => $e->getMessage()]);
    }
}

function hrUpdateApplicationStatus(int $id): void {
    try {
        hrAuthenticateRequest();
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        // Validate status
        Validator::reset();
        Validator::required($data['status'] ?? '', 'status');
        if (Validator::hasErrors()) {
            respondError(400, 'Validation failed', Validator::getErrors());
        }
        
        $validStatuses = ['Pending', 'Shortlisted', 'Rejected', 'Selected', 'Interview Scheduled'];
        if (!in_array($data['status'], $validStatuses)) {
            respondError(400, 'Invalid status. Valid statuses: ' . implode(', ', $validStatuses));
        }
        
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare("UPDATE applications SET status = ? WHERE application_id = ?");
        $stmt->execute([$data['status'], $id]);
        
        if ($stmt->rowCount() === 0) {
            respondError(404, 'Application not found');
        }
        
        respondSuccess([
            'application_id' => $id,
            'status' => $data['status']
        ], 'Application status updated successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to update application status', ['error' => $e->getMessage()]);
    }
}
