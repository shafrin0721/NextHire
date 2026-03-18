<?php
/**
 * HR Authentication Backend
 * Handles HR user login, registration, and session management
 */
declare(strict_types=1);

require_once '../config.php';
require_once '../validation.php';

function generateHRToken(array $user): string {
    $payload = [
        'user_id' => (int)$user['user_id'],
        'email' => $user['email'],
        'role' => $user['role'],
        'full_name' => $user['full_name'],
        'company_id' => $user['company_id'] ?? null,
        'iat' => time(),
        'exp' => time() + (24 * 60 * 60) // 24 hours
    ];
    return base64_encode(json_encode($payload));
}

function verifyHRToken(string $token): ?array {
    try {
        $payload = json_decode(base64_decode($token), true);
        if (!$payload || !isset($payload['exp']) || $payload['exp'] < time()) {
            return null;
        }
        // Check if user has HR role
        if (!in_array($payload['role'], ['hr', 'admin'])) {
            return null;
        }
        return $payload;
    } catch (Exception $e) {
        return null;
    }
}

function hrAuthenticateRequest(): array {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    
    if (!preg_match('/Bearer\s+(.+)/i', $authHeader, $matches)) {
        respondError(401, 'Access token required');
    }
    
    $payload = verifyHRToken($matches[1]);
    if (!$payload) {
        respondError(403, 'Invalid or expired token');
    }
    
    return $payload;
}

if (!defined('HR_AUTH_LIBRARY_ONLY')) {
    // Route handling (only when accessed as auth endpoint)
    $method = $_SERVER['REQUEST_METHOD'];
    $request = explode('/', trim($_SERVER['PATH_INFO'] ?? '', '/'));

    switch ($method) {
        case 'POST':
            if (isset($request[1]) && $request[1] === 'login') {
                hrLogin();
            } elseif (isset($request[1]) && $request[1] === 'register') {
                hrRegister();
            } else {
                respondError(404, 'Endpoint not found');
            }
            break;

        case 'GET':
            if (isset($request[1]) && $request[1] === 'me') {
                hrGetCurrentUser();
            } else {
                respondError(404, 'Endpoint not found');
            }
            break;

        default:
            respondError(405, 'Method not allowed');
    }
}

function hrLogin(): void {
    $data = json_decode(file_get_contents('php://input'), true) ?? [];
    
    // Validate
    Validator::reset();
    Validator::required($data['email'] ?? '', 'email');
    Validator::required($data['password'] ?? '', 'password');
    
    if (Validator::hasErrors()) {
        respondError(400, 'Validation failed', Validator::getErrors());
    }
    
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare(
            "SELECT u.*, COUNT(DISTINCT j.job_id) as total_jobs, COUNT(DISTINCT a.application_id) as total_applications 
             FROM users u 
             LEFT JOIN jobs j ON u.user_id = j.created_by 
             LEFT JOIN applications a ON j.job_id = a.job_id 
             WHERE u.email = ? AND u.role IN ('hr', 'admin') AND u.is_active = 1 
             GROUP BY u.user_id"
        );
        $stmt->execute([trim($data['email'])]);
        $user = $stmt->fetch();
        
        if (!$user || !password_verify($data['password'], $user['password'])) {
            respondError(401, 'Invalid email or password');
        }
        
        $token = generateHRToken($user);
        respondSuccess([
            'token' => $token,
            'user' => [
                'user_id' => $user['user_id'],
                'email' => $user['email'],
                'full_name' => $user['full_name'],
                'role' => $user['role'],
                'phone' => $user['phone'],
                'profile_photo' => $user['profile_photo']
            ]
        ], 'Login successful');
    } catch (Exception $e) {
        respondError(500, 'Login failed', ['error' => $e->getMessage()]);
    }
}

function hrRegister(): void {
    $data = json_decode(file_get_contents('php://input'), true) ?? [];
    
    // Validate
    Validator::reset();
    Validator::required($data['full_name'] ?? '', 'full_name');
    Validator::required($data['email'] ?? '', 'email');
    Validator::email($data['email'] ?? '', 'email');
    Validator::required($data['password'] ?? '', 'password');
    Validator::minLength($data['password'] ?? '', 8, 'password');
    
    if (Validator::hasErrors()) {
        respondError(400, 'Validation failed', Validator::getErrors());
    }
    
    try {
        $pdo = getDBConnection();
        
        // Check if email exists
        Validator::reset();
        Validator::unique($pdo, 'users', 'email', $data['email'], 'email');
        if (Validator::hasErrors()) {
            respondError(409, 'Email already registered', Validator::getErrors());
        }
        
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
        
        $stmt = $pdo->prepare(
            "INSERT INTO users (full_name, email, password, phone, role, is_active) 
             VALUES (?, ?, ?, ?, ?, 1)"
        );
        $stmt->execute([
            $data['full_name'],
            $data['email'],
            $hashedPassword,
            $data['phone'] ?? null,
            'hr'
        ]);
        
        $userId = (int)$pdo->lastInsertId();
        
        $user = [
            'user_id' => $userId,
            'email' => $data['email'],
            'full_name' => $data['full_name'],
            'role' => 'hr'
        ];
        
        $token = generateHRToken([...$user, 'password' => $hashedPassword, 'phone' => $data['phone'] ?? null, 'company_id' => null]);
        
        respondCreated([
            'token' => $token,
            'user' => $user
        ], 'HR account created successfully');
    } catch (Exception $e) {
        respondError(500, 'Registration failed', ['error' => $e->getMessage()]);
    }
}

function hrGetCurrentUser(): void {
    try {
        $payload = hrAuthenticateRequest();
        
        $pdo = getDBConnection();
        $stmt = $pdo->prepare(
            "SELECT user_id, email, full_name, phone, role, profile_photo FROM users WHERE user_id = ? AND role IN ('hr', 'admin')"
        );
        $stmt->execute([$payload['user_id']]);
        $user = $stmt->fetch();
        
        if (!$user) {
            respondError(404, 'User not found');
        }
        
        respondSuccess($user, 'User retrieved successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to retrieve user', ['error' => $e->getMessage()]);
    }
}
