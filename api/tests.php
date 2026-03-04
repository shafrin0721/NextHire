<?php
/**
 * Skill Tests API for NextHire
 * Handles MCQ test management
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
            getTest($request[0]);
        } else {
            getTests();
        }
        break;
    
    case 'POST':
        authenticateRequest();
        createTest();
        break;
    
    case 'PUT':
        authenticateRequest();
        if (isset($request[0]) && is_numeric($request[0])) {
            updateTest($request[0]);
        }
        break;
    
    case 'DELETE':
        authenticateRequest();
        if (isset($request[0]) && is_numeric($request[0])) {
            deleteTest($request[0]);
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function getTests() {
    $pdo = getDBConnection();
    $stmt = $pdo->query("SELECT * FROM skill_tests ORDER BY created_at DESC");
    $tests = $stmt->fetchAll();
    echo json_encode($tests);
}

function getTest($id) {
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("SELECT * FROM skill_tests WHERE id = ?");
    $stmt->execute([$id]);
    $test = $stmt->fetch();
    
    if (!$test) {
        http_response_code(404);
        echo json_encode(['error' => 'Test not found']);
        return;
    }
    
    echo json_encode($test);
}

function createTest() {
    $pdo = getDBConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("INSERT INTO skill_tests (name, position, questions, description, status) VALUES (?, ?, ?, ?, 'Active')");
    $stmt->execute([
        $data['name'] ?? '',
        $data['position'] ?? '',
        $data['questions'] ?? 0,
        $data['description'] ?? ''
    ]);
    
    $id = $pdo->lastInsertId();
    http_response_code(201);
    echo json_encode(['id' => $id, 'message' => 'Test created successfully']);
}

function updateTest($id) {
    $pdo = getDBConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $pdo->prepare("UPDATE skill_tests SET 
        name = COALESCE(?, name),
        position = COALESCE(?, position),
        questions = COALESCE(?, questions),
        description = COALESCE(?, description),
        status = COALESCE(?, status)
        WHERE id = ?");
    
    $stmt->execute([
        $data['name'] ?? null,
        $data['position'] ?? null,
        $data['questions'] ?? null,
        $data['description'] ?? null,
        $data['status'] ?? null,
        $id
    ]);
    
    echo json_encode(['message' => 'Test updated successfully']);
}

function deleteTest($id) {
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("DELETE FROM skill_tests WHERE id = ?");
    $stmt->execute([$id]);
    
    echo json_encode(['message' => 'Test deleted successfully']);
}

