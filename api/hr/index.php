<?php
/**
 * HR API Router
 * Main entry point for all HR-related API endpoints
 */
declare(strict_types=1);

require_once '../config.php';

// Get the requested endpoint
$request = trim($_SERVER['PATH_INFO'] ?? '', '/');
$parts = explode('/', $request);

// Route to appropriate HR API module
if (isset($parts[0]) && $parts[0] === 'auth') {
    require_once 'hr_auth.php';
} elseif (isset($parts[0]) && $parts[0] === 'jobs') {
    require_once 'hr_jobs.php';
} elseif (isset($parts[0]) && $parts[0] === 'candidates') {
    require_once 'hr_candidates.php';
} elseif (isset($parts[0]) && $parts[0] === 'applications') {
    require_once 'hr_applications.php';
} elseif (isset($parts[0]) && $parts[0] === 'interviews') {
    require_once 'hr_interviews.php';
} elseif (isset($parts[0]) && $parts[0] === 'dashboard') {
    require_once 'hr_dashboard.php';
} else {
    http_response_code(404);
    echo json_encode([
        'status' => 'error',
        'message' => 'HR API endpoint not found',
        'available_endpoints' => [
            'POST /api/hr/auth/login' => 'HR login',
            'POST /api/hr/auth/register' => 'HR registration',
            'GET /api/hr/auth/me' => 'Get current HR user',
            'GET /api/hr/jobs' => 'List all jobs',
            'GET /api/hr/jobs/{id}' => 'Get single job',
            'POST /api/hr/jobs' => 'Create job',
            'PUT /api/hr/jobs/{id}' => 'Update job',
            'DELETE /api/hr/jobs/{id}' => 'Delete job',
            'GET /api/hr/candidates' => 'List all candidates',
            'GET /api/hr/candidates/{id}' => 'Get candidate details',
            'GET /api/hr/applications' => 'List applications',
            'GET /api/hr/applications/{id}' => 'Get application details',
            'PUT /api/hr/applications/{id}' => 'Update application',
            'PUT /api/hr/applications/{id}/status' => 'Update application status',
            'GET /api/hr/interviews' => 'List interviews',
            'GET /api/hr/interviews/{id}' => 'Get interview details',
            'POST /api/hr/interviews' => 'Schedule interview',
            'PUT /api/hr/interviews/{id}' => 'Update interview',
            'DELETE /api/hr/interviews/{id}' => 'Cancel interview',
            'GET /api/hr/dashboard' => 'Get dashboard data',
            'GET /api/hr/dashboard/summary' => 'Get summary stats',
            'GET /api/hr/dashboard/applications-trend' => 'Get applications trend',
            'GET /api/hr/dashboard/top-jobs' => 'Get top jobs',
            'GET /api/hr/dashboard/skill-match' => 'Get skill match distribution',
            'GET /api/hr/dashboard/recent-activity' => 'Get recent activity'
        ]
    ]);
    exit;
}
