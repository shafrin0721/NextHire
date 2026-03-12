<?php
/**
 * Authentication API for NextHire
 * Handles HR login and session management
 */

require_once 'config.php';

function generateToken($user) {
    $payload = [
        'user_id' => $user['id'],
        'username' => $user['username'],
        'role' => $user['role'],
        'exp' => time() + (24 * 60 * 60) // 24 hours
    ];
    return base64_encode(json_encode($payload));
}

function verifyToken($token) {
    try {
        $payload = json_decode(base64_decode($token), true);
        if (!$payload || !isset($payload['exp']) || $payload['exp'] < time()) {
            return null;
        }
        return $payload;
    } catch (Exception $e) {
        return null;
    }
}

function authenticateRequest() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    
    if (!preg_match('/Bearer\s+(.+)/i', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode(['error' => 'Access token required']);
        exit;
    }
    
    $payload = verifyToken($matches[1]);
    if (!$payload) {
        http_response_code(403);
        echo json_encode(['error' => 'Invalid token']);
        exit;
    }
    
    return $payload;
}

// Route handling
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'] ?? '', '/'));

switch ($method) {
    case 'POST':
        if (isset($request[0]) && $request[0] === 'login') {
            login();
        } elseif (isset($request[0]) && $request[0] === 'logout') {
            logout();
        }
        break;
    
    case 'GET':
        if (isset($request[0]) && $request[0] === 'me') {
            getCurrentUser();
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function login() {
    $pdo = getDBConnection();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';
    
    if (empty($username) || empty($password)) {
        http_response_code(400);
        echo json_encode(['error' => 'Username and password required']);
        return;
    }
    
    // For demo, check hardcoded credentials
    if ($username === 'hradmin' && $password === 'hr123') {
        $user = [
            'id' => 1,
            'username' => 'hradmin',
            'name' => 'HR Admin',
            'role' => 'Administrator'
        ];
        $token = generateToken($user);
        echo json_encode(['token' => $token, 'user' => $user]);
        return;
    }
    
    if ($username === 'hruser' && $password === 'user123') {
        $user = [
            'id' => 2,
            'username' => 'hruser',
            'name' => 'HR User',
            'role' => 'HR Manager'
        ];
        $token = generateToken($user);
        echo json_encode(['token' => $token, 'user' => $user]);
        return;
    }
    
    // Check database
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    
    if ($user && password_verify($password, $user['password'])) {
        $token = generateToken($user);
        echo json_encode([
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'name' => $user['name'],
                'role' => $user['role']
            ]
        ]);
        return;
    }
    
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
}

function logout() {
    authenticateRequest();
    echo json_encode(['message' => 'Logged out successfully']);
}

function getCurrentUser() {
    $payload = authenticateRequest();
    echo json_encode(['user' => $payload]);
}

