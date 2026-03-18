<?php
/**
 * HR Interviews Management Backend
 * Handles interview scheduling and management for HR
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
            hrGetInterview((int)$request[1]);
        } else {
            hrGetInterviews();
        }
        break;
    
    case 'POST':
        hrAuthenticateRequest();
        hrScheduleInterview();
        break;
    
    case 'PUT':
        hrAuthenticateRequest();
        if (isset($request[1]) && is_numeric($request[1])) {
            hrUpdateInterview((int)$request[1]);
        } else {
            respondError(400, 'Interview ID required');
        }
        break;
    
    case 'DELETE':
        hrAuthenticateRequest();
        if (isset($request[1]) && is_numeric($request[1])) {
            hrCancelInterview((int)$request[1]);
        } else {
            respondError(400, 'Interview ID required');
        }
        break;
    
    default:
        respondError(405, 'Method not allowed');
}

function hrGetInterviews(): void {
    try {
        $pdo = getDBConnection();
        
        $status = $_GET['status'] ?? null;
        $type = $_GET['type'] ?? null;
        $search = $_GET['search'] ?? null;
        $page = (int)($_GET['page'] ?? 1);
        $limit = (int)($_GET['limit'] ?? 10);
        $offset = ($page - 1) * $limit;
        
        $where = [];
        $params = [];
        
        if ($status) {
            $where[] = "i.interview_status = ?";
            $params[] = $status;
        }
        
        if ($type) {
            $where[] = "i.interview_type = ?";
            $params[] = $type;
        }
        
        if ($search) {
            $where[] = "(u.full_name LIKE ? OR j.title LIKE ?)";
            $params[] = "%{$search}%";
            $params[] = "%{$search}%";
        }
        
        $whereClause = !empty($where) ? "WHERE " . implode(" AND ", $where) : "";
        
        // Count total
        $countSql = "SELECT COUNT(*) FROM interviews i {$whereClause}";
        $countStmt = $pdo->prepare($countSql);
        $countStmt->execute($params);
        $total = (int)$countStmt->fetchColumn();
        
        // Get paginated interviews
        $sql = "SELECT i.interview_id, i.interview_date, i.interview_status, i.interview_type, i.location, i.interview_notes,
                       a.application_id,
                       u.user_id, u.full_name, u.email, u.phone, u.profile_photo,
                       j.job_id, j.title as job_title, j.category
                FROM interviews i 
                LEFT JOIN applications a ON i.application_id = a.application_id 
                LEFT JOIN users u ON a.candidate_id = u.user_id 
                LEFT JOIN jobs j ON a.job_id = j.job_id 
                {$whereClause}
                ORDER BY i.interview_date DESC 
                LIMIT ? OFFSET ?";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([...$params, $limit, $offset]);
        $interviews = $stmt->fetchAll();
        
        respondSuccess([
            'items' => $interviews,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => (int)ceil($total / $limit)
            ]
        ], 'Interviews retrieved successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to retrieve interviews', ['error' => $e->getMessage()]);
    }
}

function hrGetInterview(int $id): void {
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare(
            "SELECT i.*, 
                    a.application_id,
                    u.user_id, u.full_name, u.email, u.phone, u.profile_photo,
                    j.job_id, j.title as job_title, j.category, j.description,
                    cp.experience_years
             FROM interviews i 
             LEFT JOIN applications a ON i.application_id = a.application_id 
             LEFT JOIN users u ON a.candidate_id = u.user_id 
             LEFT JOIN jobs j ON a.job_id = j.job_id 
             LEFT JOIN candidate_profiles cp ON u.user_id = cp.candidate_id 
             WHERE i.interview_id = ?"
        );
        $stmt->execute([$id]);
        $interview = $stmt->fetch();
        
        if (!$interview) {
            respondError(404, 'Interview not found');
        }
        
        respondSuccess($interview, 'Interview retrieved successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to retrieve interview', ['error' => $e->getMessage()]);
    }
}

function hrScheduleInterview(): void {
    try {
        $payload = hrAuthenticateRequest();
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        // Validate
        Validator::reset();
        Validator::required($data['application_id'] ?? '', 'application_id');
        Validator::required($data['interview_date'] ?? '', 'interview_date');
        Validator::required($data['interview_type'] ?? '', 'interview_type');
        
        if (Validator::hasErrors()) {
            respondError(400, 'Validation failed', Validator::getErrors());
        }
        
        $pdo = getDBConnection();
        
        // Check application exists
        $appStmt = $pdo->prepare("SELECT application_id FROM applications WHERE application_id = ?");
        $appStmt->execute([(int)$data['application_id']]);
        if (!$appStmt->fetch()) {
            respondError(404, 'Application not found');
        }
        
        $stmt = $pdo->prepare(
            "INSERT INTO interviews (
                application_id, interview_date, interview_status, interview_type, location, interview_notes
            ) VALUES (?, ?, ?, ?, ?, ?)"
        );
        
        $stmt->execute([
            (int)$data['application_id'],
            $data['interview_date'],
            'Scheduled',
            $data['interview_type'],
            $data['location'] ?? 'To be announced',
            $data['interview_notes'] ?? null
        ]);
        
        $interviewId = (int)$pdo->lastInsertId();
        
        // Update application status
        $pdo->prepare("UPDATE applications SET status = 'Interview Scheduled' WHERE application_id = ?")
            ->execute([(int)$data['application_id']]);
        
        respondCreated(['interview_id' => $interviewId], 'Interview scheduled successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to schedule interview', ['error' => $e->getMessage()]);
    }
}

function hrUpdateInterview(int $id): void {
    try {
        hrAuthenticateRequest();
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        $pdo = getDBConnection();
        
        // Check interview exists
        $checkStmt = $pdo->prepare("SELECT interview_id FROM interviews WHERE interview_id = ?");
        $checkStmt->execute([$id]);
        if (!$checkStmt->fetch()) {
            respondError(404, 'Interview not found');
        }
        
        // Update interview
        $updates = [];
        $params = [];
        
        $fields = ['interview_date', 'interview_type', 'location', 'interview_notes', 'interview_status'];
        foreach ($fields as $field) {
            if (isset($data[$field])) {
                $updates[] = "{$field} = ?";
                $params[] = $data[$field];
            }
        }
        
        if (!empty($updates)) {
            $params[] = $id;
            $sql = "UPDATE interviews SET " . implode(", ", $updates) . " WHERE interview_id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
        }
        
        // If status is Completed, update final_decision if provided
        if (isset($data['final_decision'])) {
            $pdo->prepare("UPDATE interviews SET final_decision = ? WHERE interview_id = ?")
                ->execute([$data['final_decision'], $id]);
        }
        
        respondSuccess(['interview_id' => $id], 'Interview updated successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to update interview', ['error' => $e->getMessage()]);
    }
}

function hrCancelInterview(int $id): void {
    try {
        hrAuthenticateRequest();
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare("UPDATE interviews SET interview_status = 'Cancelled' WHERE interview_id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() === 0) {
            respondError(404, 'Interview not found');
        }
        
        respondSuccess(['interview_id' => $id], 'Interview cancelled successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to cancel interview', ['error' => $e->getMessage()]);
    }
}
