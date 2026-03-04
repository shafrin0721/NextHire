<?php
/**
 * Anonymous Screening API for NextHire
 * Handles blind hiring candidate management
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
        getScreeningCandidates();
        break;
    
    case 'POST':
        authenticateRequest();
        if (isset($request[0]) && $request[0] === 'reveal' && isset($request[1])) {
            revealIdentity($request[1]);
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function getScreeningCandidates() {
    $pdo = getDBConnection();
    $stmt = $pdo->query("SELECT * FROM anonymous_screening ORDER BY skill_match DESC");
    $candidates = $stmt->fetchAll();
    echo json_encode($candidates);
}

function revealIdentity($id) {
    $pdo = getDBConnection();
    
    // Get current candidate
    $stmt = $pdo->prepare("SELECT * FROM anonymous_screening WHERE id = ?");
    $stmt->execute([$id]);
    $candidate = $stmt->fetch();
    
    if (!$candidate) {
        http_response_code(404);
        echo json_encode(['error' => 'Candidate not found']);
        return;
    }
    
    // Sample names for demo
    $names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'Tom Brown'];
    $identity = $names[array_rand($names)];
    
    // Update candidate
    $stmt = $pdo->prepare("UPDATE anonymous_screening SET revealed = 1, identity = ?, revealed_at = NOW() WHERE id = ?");
    $stmt->execute([$identity, $id]);
    
    // Log the reveal action
    $payload = authenticateRequest();
    $stmt = $pdo->prepare("INSERT INTO identity_reveal_logs (candidate_id, identity, revealed_by) VALUES (?, ?, ?)");
    $stmt->execute([$id, $identity, $payload['username']]);
    
    echo json_encode(['message' => 'Identity revealed', 'identity' => $identity]);
}

