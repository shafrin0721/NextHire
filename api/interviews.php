<?php
/**
 * Interviews API for NextHire
 * Handles interview scheduling and management
 */

require_once 'config.php';

function authenticateRequest() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    
    if (!preg_match('/Bearer\s+(.+)/i', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode(['error' => 'Access token required']);
        exit;
    }
    
    $token = $matches[1];
    $payload = json_decode(base64_decode($token), true);
    if (!$payload || !isset($payload['exp']) || $payload['exp'] < time()) {
        http_response_code(403);
        echo json_encode(['error' => 'Invalid token']);
        exit;
    }
    
    return $payload;
}

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'] ?? '', '/'));

switch ($method) {
    case 'GET':
        authenticateRequest();
        if (isset($request[0]) && is_numeric($request[0])) {
            getInterview($request[0]);
        } else {
            getInterviews();
        }
        break;
    
    case 'POST':
        authenticateRequest();
        createInterview();
        break;
    
    case 'PUT':
        authenticateRequest();
        if (isset($request[0]) && is_numeric($request[0])) {
            updateInterview($request[0]);
        }
        break;
    
    case 'DELETE':
        authenticateRequest();
        if (isset($request[0]) && is_numeric($request[0])) {
            deleteInterview($request[0]);
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function getInterviews() {
    $pdo = getDBConnection();
    $stmt = $pdo->query("SELECT * FROM interviews ORDER BY interview_date DESC, interview_time DESC");
    $interviews = $stmt->fetchAll();
    echo json_encode($interviews);
}

function getInterview($id) {
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("SELECT * FROM interviews WHERE id = ?");
    $stmt->execute([$id]);
    $interview = $stmt->fetch();
    
    if (!$interview) {
        http_response_code(404);
        echo json_encode(['error' => 'Interview not found']);
        return;
    }
    
    echo json_encode($interview);
}

function createInterview() {
    $pdo = getDBConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("INSERT INTO interviews 
        (candidate_id, candidate_name, position, interview_date, interview_time, interview_type, location, notes, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Scheduled')");
    
    $stmt->execute([
        $data['candidateId'] ?? '',
        $data['candidateName'] ?? '',
        $data['position'] ?? '',
        $data['date'] ?? date('Y-m-d'),
        $data['time'] ?? '09:00:00',
        $data['type'] ?? 'Technical',
        $data['location'] ?? '',
        $data['notes'] ?? ''
    ]);
    
    $id = $pdo->lastInsertId();
    http_response_code(201);
    echo json_encode(['id' => $id, 'message' => 'Interview scheduled successfully']);
}

function updateInterview($id) {
    $pdo = getDBConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("UPDATE interviews SET 
        candidate_id = COALESCE(?, candidate_id),
        candidate_name = COALESCE(?, candidate_name),
        position = COALESCE(?, position),
        interview_date = COALESCE(?, interview_date),
        interview_time = COALESCE(?, interview_time),
        interview_type = COALESCE(?, interview_type),
        location = COALESCE(?, location),
        notes = COALESCE(?, notes),
        status = COALESCE(?, status)
        WHERE id = ?");
    
    $stmt->execute([
        $data['candidateId'] ?? null,
        $data['candidateName'] ?? null,
        $data['position'] ?? null,
        $data['date'] ?? null,
        $data['time'] ?? null,
        $data['type'] ?? null,
        $data['location'] ?? null,
        $data['notes'] ?? null,
        $data['status'] ?? null,
        $id
    ]);
    
    echo json_encode(['message' => 'Interview updated successfully']);
}

function deleteInterview($id) {
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("DELETE FROM interviews WHERE id = ?");
    $stmt->execute([$id]);
    
    echo json_encode(['message' => 'Interview deleted successfully']);
}

