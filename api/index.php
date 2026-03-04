<?php
/**
 * NextHire API Index
 * Main entry point for API routing
 */

// Handle routing
$request = $_SERVER['PATH_INFO'] ?? '/';
$request = trim($request, '/');

// Route to appropriate API
if (strpos($request, 'auth') === 0) {
    require_once 'auth.php';
} elseif (strpos($request, 'jobs') === 0) {
    require_once 'jobs.php';
} elseif (strpos($request, 'applications') === 0) {
    require_once 'applications.php';
} elseif (strpos($request, 'screening') === 0) {
    require_once 'screening.php';
} elseif (strpos($request, 'tests') === 0) {
    require_once 'tests.php';
} elseif (strpos($request, 'interviews') === 0) {
    require_once 'interviews.php';
} elseif (strpos($request, 'reports') === 0 || strpos($request, 'dashboard') === 0) {
    require_once 'reports.php';
} else {
    http_response_code(404);
    echo json_encode([
        'error' => 'Endpoint not found',
        'available_endpoints' => [
            'POST /api/auth/login' => 'Login',
            'GET /api/auth/me' => 'Get current user',
            'GET /api/jobs' => 'List jobs',
            'POST /api/jobs' => 'Create job',
            'GET /api/applications' => 'List applications',
            'POST /api/applications' => 'Submit application',
            'GET /api/screening' => 'List anonymous candidates',
            'POST /api/screening/{id}/reveal' => 'Reveal candidate identity',
            'GET /api/tests' => 'List skill tests',
            'POST /api/tests' => 'Create test',
            'GET /api/interviews' => 'List interviews',
            'POST /api/interviews' => 'Schedule interview',
            'GET /api/reports' => 'Get reports',
            'GET /api/dashboard' => 'Get dashboard stats'
        ]
    ]);
}

