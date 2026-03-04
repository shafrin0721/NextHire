<?php
/**
 * Jobs API for NextHire
 * Handles job CRUD operations
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
    
    // Simple token verification (in production, use proper JWT)
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

// Route: GET /api/jobs - List all jobs
// Route: GET /api/jobs/{id} - Get single job
// Route: POST /api/jobs - Create job
// Route: PUT /api/jobs/{id} - Update job
// Route: DELETE /api/jobs/{id} - Delete job

switch ($method) {
    case 'GET':
        authenticateRequest();
        if (isset($request[0]) && is_numeric($request[0])) {
            getJob($request[0]);
        } else {
            getJobs();
        }
        break;
    
    case 'POST':
        authenticateRequest();
        createJob();
        break;
    
    case 'PUT':
        authenticateRequest();
        if (isset($request[0]) && is_numeric($request[0])) {
            updateJob($request[0]);
        }
        break;
    
    case 'DELETE':
        authenticateRequest();
        if (isset($request[0]) && is_numeric($request[0])) {
            deleteJob($request[0]);
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function getJobs() {
    $pdo = getDBConnection();
    $stmt = $pdo->query("SELECT j.*, COUNT(a.id) as applications 
                         FROM jobs j 
                         LEFT JOIN applications a ON j.id = a.job_id 
                         GROUP BY j.id 
                         ORDER BY j.created_at DESC");
    $jobs = $stmt->fetchAll();
    echo json_encode($jobs);
}

function getJob($id) {
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("SELECT j.*, COUNT(a.id) as applications 
                           FROM jobs j 
                           LEFT JOIN applications a ON j.id = a.job_id 
                           WHERE j.id = ? 
                           GROUP BY j.id");
    $stmt->execute([$id]);
    $job = $stmt->fetch();
    
    if (!$job) {
        http_response_code(404);
        echo json_encode(['error' => 'Job not found']);
        return;
    }
    
    echo json_encode($job);
}

function createJob() {
    $pdo = getDBConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("INSERT INTO jobs (title, department, location, type, description, requirements, skills, status, expiration_date) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    $stmt->execute([
        $data['title'] ?? '',
        $data['department'] ?? '',
        $data['location'] ?? '',
        $data['type'] ?? 'Full-Time',
        $data['description'] ?? '',
        $data['requirements'] ?? '',
        is_array($data['skills'] ?? '') ? implode(',', $data['skills']) : ($data['skills'] ?? ''),
        $data['status'] ?? 'Active',
        $data['expirationDate'] ?? date('Y-m-d', strtotime('+30 days'))
    ]);
    
    $id = $pdo->lastInsertId();
    http_response_code(201);
    echo json_encode(['id' => $id, 'message' => 'Job created successfully']);
}

function updateJob($id) {
    $pdo = getDBConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("UPDATE jobs SET 
                           title = COALESCE(?, title),
                           department = COALESCE(?, department),
                           location = COALESCE(?, location),
                           type = COALESCE(?, type),
                           description = COALESCE(?, description),
                           requirements = COALESCE(?, requirements),
                           skills = COALESCE(?, skills),
                           status = COALESCE(?, status),
                           expiration_date = COALESCE(?, expiration_date)
                           WHERE id = ?");
    
    $skills = is_array($data['skills'] ?? '') ? implode(',', $data['skills']) : ($data['skills'] ?? null);
    
    $stmt->execute([
        $data['title'] ?? null,
        $data['department'] ?? null,
        $data['location'] ?? null,
        $data['type'] ?? null,
        $data['description'] ?? null,
        $data['requirements'] ?? null,
        $skills,
        $data['status'] ?? null,
        $data['expirationDate'] ?? null,
        $id
    ]);
    
    echo json_encode(['message' => 'Job updated successfully']);
}

function deleteJob($id) {
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("DELETE FROM jobs WHERE id = ?");
    $stmt->execute([$id]);
    
    echo json_encode(['message' => 'Job deleted successfully']);
}

