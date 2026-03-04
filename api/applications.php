<?php
/**
 * Applications API for NextHire
 * Handles candidate application management
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
        if (isset($request[0]) && $request[0] !== '') {
            getApplication($request[0]);
        } else {
            getApplications();
        }
        break;
    
    case 'POST':
        // Public endpoint for submitting applications
        createApplication();
        break;
    
    case 'PUT':
        authenticateRequest();
        if (isset($request[0]) && $request[0] === 'status' && isset($request[1])) {
            updateApplicationStatus($request[1]);
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function getApplications() {
    $pdo = getDBConnection();
    $stmt = $pdo->query("SELECT * FROM applications ORDER BY applied_at DESC");
    $applications = $stmt->fetchAll();
    echo json_encode($applications);
}

function getApplication($id) {
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("SELECT * FROM applications WHERE id = ?");
    $stmt->execute([$id]);
    $application = $stmt->fetch();
    
    if (!$application) {
        http_response_code(404);
        echo json_encode(['error' => 'Application not found']);
        return;
    }
    
    echo json_encode($application);
}

function createApplication() {
    $pdo = getDBConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Generate application ID
    $id = 'C-' . rand(1000, 9999);
    
    $stmt = $pdo->prepare("INSERT INTO applications 
        (id, candidate_name, email, phone, job_id, position, experience, education, skills, cv_path, skill_match, test_score, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')");
    
    $stmt->execute([
        $id,
        $data['candidateName'] ?? '',
        $data['email'] ?? '',
        $data['phone'] ?? '',
        $data['jobId'] ?? 1,
        $data['position'] ?? '',
        $data['experience'] ?? '',
        $data['education'] ?? '',
        $data['skills'] ?? '',
        $data['cvPath'] ?? '',
        $data['skillMatch'] ?? '0%',
        $data['testScore'] ?? '0%'
    ]);
    
    http_response_code(201);
    echo json_encode(['id' => $id, 'message' => 'Application submitted successfully']);
}

function updateApplicationStatus($id) {
    $pdo = getDBConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("UPDATE applications SET status = ? WHERE id = ?");
    $stmt->execute([$data['status'] ?? 'Pending', $id]);
    
    echo json_encode(['message' => 'Status updated successfully']);
}

