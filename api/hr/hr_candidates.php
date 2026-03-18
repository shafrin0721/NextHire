<?php
/**
 * HR Candidates Management Backend
 * Handles candidate viewing, screening, and management for HR
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
            hrGetCandidate((int)$request[1]);
        } else {
            hrGetCandidates();
        }
        break;
    
    case 'PUT':
        hrAuthenticateRequest();
        if (isset($request[1]) && is_numeric($request[1])) {
            hrUpdateCandidateProfile((int)$request[1]);
        } else {
            respondError(400, 'Candidate ID required');
        }
        break;
    
    default:
        respondError(405, 'Method not allowed');
}

function hrGetCandidates(): void {
    try {
        $pdo = getDBConnection();
        
        $search = $_GET['search'] ?? null;
        $department = $_GET['department'] ?? null;
        $seniority = $_GET['seniority'] ?? null;
        $status = $_GET['status'] ?? null;
        $page = (int)($_GET['page'] ?? 1);
        $limit = (int)($_GET['limit'] ?? 10);
        $offset = ($page - 1) * $limit;
        
        $where = ["u.role = 'candidate'"];
        $params = [];
        
        if ($search) {
            $where[] = "(u.full_name LIKE ? OR u.email LIKE ?)";
            $params[] = "%{$search}%";
            $params[] = "%{$search}%";
        }
        
        if ($seniority) {
            $where[] = "cp.experience_years >= ?";
            $params[] = $seniority;
        }
        
        $whereClause = implode(" AND ", $where);
        
        // Count total
        $countSql = "SELECT COUNT(DISTINCT u.user_id) FROM users u LEFT JOIN candidate_profiles cp ON u.user_id = cp.candidate_id WHERE {$whereClause}";
        $countStmt = $pdo->prepare($countSql);
        $countStmt->execute($params);
        $total = (int)$countStmt->fetchColumn();
        
        // Get paginated candidates
        $sql = "SELECT u.user_id, u.full_name, u.email, u.phone, u.profile_photo, 
                       cp.experience_years, cp.education, cp.certifications_count,
                       COUNT(DISTINCT a.application_id) as application_count,
                       COUNT(DISTINCT CASE WHEN a.status = 'Shortlisted' THEN a.application_id END) as shortlisted_count,
                       COUNT(DISTINCT CASE WHEN a.status = 'Interview Scheduled' THEN a.application_id END) as interview_count
                FROM users u 
                LEFT JOIN candidate_profiles cp ON u.user_id = cp.candidate_id 
                LEFT JOIN applications a ON u.user_id = a.candidate_id 
                WHERE {$whereClause}
                GROUP BY u.user_id 
                ORDER BY u.created_at DESC 
                LIMIT ? OFFSET ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([...$params, $limit, $offset]);
        $candidates = $stmt->fetchAll();
        
        respondSuccess([
            'items' => $candidates,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => (int)ceil($total / $limit)
            ]
        ], 'Candidates retrieved successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to retrieve candidates', ['error' => $e->getMessage()]);
    }
}

function hrGetCandidate(int $id): void {
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare(
            "SELECT u.user_id, u.full_name, u.email, u.phone, u.profile_photo, u.created_at,
                    cp.date_of_birth, cp.gender, cp.address, cp.education, cp.experience_years, cp.portfolio_link, cp.certifications_count,
                    COUNT(DISTINCT a.application_id) as total_applications,
                    COUNT(DISTINCT j.job_id) as applied_positions,
                    AVG(a.match_percentage) as avg_match_percentage
             FROM users u 
             LEFT JOIN candidate_profiles cp ON u.user_id = cp.candidate_id 
             LEFT JOIN applications a ON u.user_id = a.candidate_id 
             LEFT JOIN jobs j ON a.job_id = j.job_id 
             WHERE u.user_id = ? AND u.role = 'candidate'
             GROUP BY u.user_id"
        );
        $stmt->execute([$id]);
        $candidate = $stmt->fetch();
        
        if (!$candidate) {
            respondError(404, 'Candidate not found');
        }
        
        // Get candidate skills
        $skillSql = "SELECT DISTINCT js.skill_name 
                     FROM applications a 
                     JOIN jobs j ON a.job_id = j.job_id 
                     JOIN job_skills js ON j.job_id = js.job_id 
                     WHERE a.candidate_id = ? 
                     LIMIT 10";
        $skillStmt = $pdo->prepare($skillSql);
        $skillStmt->execute([$id]);
        $candidate['skills'] = array_column($skillStmt->fetchAll(), 'skill_name');
        
        // Get candidate applications
        $appSql = "SELECT a.application_id, a.status, a.match_percentage, a.applied_at, j.title, j.category 
                   FROM applications a 
                   JOIN jobs j ON a.job_id = j.job_id 
                   WHERE a.candidate_id = ? 
                   ORDER BY a.applied_at DESC 
                   LIMIT 5";
        $appStmt = $pdo->prepare($appSql);
        $appStmt->execute([$id]);
        $candidate['recent_applications'] = $appStmt->fetchAll();
        
        respondSuccess($candidate, 'Candidate retrieved successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to retrieve candidate', ['error' => $e->getMessage()]);
    }
}

function hrUpdateCandidateProfile(int $id): void {
    try {
        hrAuthenticateRequest();
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        $pdo = getDBConnection();
        
        // Check candidate exists
        $checkStmt = $pdo->prepare("SELECT user_id FROM users WHERE user_id = ? AND role = 'candidate'");
        $checkStmt->execute([$id]);
        if (!$checkStmt->fetch()) {
            respondError(404, 'Candidate not found');
        }
        
        // Update candidate profile
        $updates = [];
        $params = [];
        
        $fields = ['date_of_birth', 'gender', 'address', 'education', 'experience_years', 'portfolio_link', 'certifications_count'];
        foreach ($fields as $field) {
            if (isset($data[$field])) {
                $updates[] = "{$field} = ?";
                $params[] = $data[$field];
            }
        }
        
        if (!empty($updates)) {
            $params[] = $id;
            $sql = "UPDATE candidate_profiles SET " . implode(", ", $updates) . " WHERE candidate_id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
        }
        
        respondSuccess(['candidate_id' => $id], 'Candidate profile updated successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to update candidate profile', ['error' => $e->getMessage()]);
    }
}
