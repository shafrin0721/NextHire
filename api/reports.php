<?php
/**
 * Reports & Dashboard API for NextHire
 * Handles analytics and statistics
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
        if (isset($request[0]) && $request[0] === 'dashboard') {
            getDashboardStats();
        } else {
            getReports();
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function getDashboardStats() {
    $pdo = getDBConnection();
    
    // Active jobs count
    $stmt = $pdo->query("SELECT COUNT(*) FROM jobs WHERE status = 'Active'");
    $activeJobs = $stmt->fetchColumn();
    
    // Total applications
    $stmt = $pdo->query("SELECT COUNT(*) FROM applications");
    $totalApplications = $stmt->fetchColumn();
    
    // Shortlisted candidates
    $stmt = $pdo->query("SELECT COUNT(*) FROM applications WHERE status = 'Shortlisted'");
    $shortlisted = $stmt->fetchColumn();
    
    // Rejected candidates
    $stmt = $pdo->query("SELECT COUNT(*) FROM applications WHERE status = 'Rejected'");
    $rejected = $stmt->fetchColumn();
    
    // Recent applications
    $stmt = $pdo->query("SELECT * FROM applications ORDER BY applied_at DESC LIMIT 5");
    $recentApplications = $stmt->fetchAll();
    
    echo json_encode([
        'activeJobs' => $activeJobs,
        'totalApplications' => $totalApplications,
        'shortlistedCandidates' => $shortlisted,
        'rejectedCandidates' => $rejected,
        'recentApplications' => $recentApplications
    ]);
}

function getReports() {
    $pdo = getDBConnection();
    
    // Total jobs
    $stmt = $pdo->query("SELECT COUNT(*) FROM jobs");
    $totalJobs = $stmt->fetchColumn();
    
    // Active jobs
    $stmt = $pdo->query("SELECT COUNT(*) FROM jobs WHERE status = 'Active'");
    $activeJobs = $stmt->fetchColumn();
    
    // Total applications
    $stmt = $pdo->query("SELECT COUNT(*) FROM applications");
    $totalApplications = $stmt->fetchColumn();
    
    // Shortlisted
    $stmt = $pdo->query("SELECT COUNT(*) FROM applications WHERE status = 'Shortlisted'");
    $shortlisted = $stmt->fetchColumn();
    
    // Rejected
    $stmt = $pdo->query("SELECT COUNT(*) FROM applications WHERE status = 'Rejected'");
    $rejected = $stmt->fetchColumn();
    
    // Selected
    $stmt = $pdo->query("SELECT COUNT(*) FROM applications WHERE status = 'Selected'");
    $selected = $stmt->fetchColumn();
    
    // Pending
    $stmt = $pdo->query("SELECT COUNT(*) FROM applications WHERE status = 'Pending'");
    $pending = $stmt->fetchColumn();
    
    // Top jobs by applications
    $stmt = $pdo->query("SELECT position as name, COUNT(*) as count 
                          FROM applications 
                          GROUP BY position 
                          ORDER BY count DESC 
                          LIMIT 5");
    $topJobs = $stmt->fetchAll();
    
    // Calculate ratios
    $shortlistRatio = $totalApplications > 0 ? round(($shortlisted / $totalApplications) * 100, 1) . '%' : '0%';
    $conversionRate = $totalApplications > 0 ? round(($selected / $totalApplications) * 100, 1) . '%' : '0%';
    
    echo json_encode([
        'totalJobs' => $totalJobs,
        'activeJobs' => $activeJobs,
        'totalApplications' => $totalApplications,
        'shortlisted' => $shortlisted,
        'rejected' => $rejected,
        'selected' => $selected,
        'pending' => $pending,
        'topJobs' => $topJobs,
        'avgSkillMatch' => '76%',
        'shortlistRatio' => $shortlistRatio,
        'conversionRate' => $conversionRate,
        'monthlyTrend' => [
            ['month' => 'Jan', 'applications' => 120],
            ['month' => 'Feb', 'applications' => 165],
            ['month' => 'Mar', 'applications' => 210],
            ['month' => 'Apr', 'applications' => 255]
        ]
    ]);
}

