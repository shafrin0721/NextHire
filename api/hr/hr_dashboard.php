<?php
/**
 * HR Dashboard Analytics Backend
 * Provides statistics and analytics for HR dashboard
 */
declare(strict_types=1);

require_once '../config.php';
define('HR_AUTH_LIBRARY_ONLY', true);
require_once 'hr_auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'] ?? '', '/'));

switch ($method) {
    case 'GET':
        if (isset($request[1]) && $request[1] === 'summary') {
            hrGetSummary();
        } elseif (isset($request[1]) && $request[1] === 'applications-trend') {
            hrGetApplicationsTrend();
        } elseif (isset($request[1]) && $request[1] === 'top-jobs') {
            hrGetTopJobs();
        } elseif (isset($request[1]) && $request[1] === 'skill-match') {
            hrGetSkillMatchDistribution();
        } elseif (isset($request[1]) && $request[1] === 'recent-activity') {
            hrGetRecentActivity();
        } else {
            hrGetDashboard();
        }
        break;
    
    default:
        respondError(405, 'Method not allowed');
}

function hrGetDashboard(): void {
    try {
        $pdo = getDBConnection();
        
        // Get all dashboard data
        $summary = fetchSummary($pdo);
        $topJobs = fetchTopJobs($pdo);
        $skillMatch = fetchSkillMatchDistribution($pdo);
        $recentActivity = fetchRecentActivity($pdo);
        $trendData = fetchApplicationsTrend($pdo);
        
        respondSuccess([
            'summary' => $summary,
            'top_jobs' => $topJobs,
            'skill_match' => $skillMatch,
            'recent_activity' => $recentActivity,
            'applications_trend' => $trendData
        ], 'Dashboard data retrieved successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to retrieve dashboard data', ['error' => $e->getMessage()]);
    }
}

function hrGetSummary(): void {
    try {
        $pdo = getDBConnection();
        respondSuccess(fetchSummary($pdo), 'Summary retrieved successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to retrieve summary', ['error' => $e->getMessage()]);
    }
}

function hrGetApplicationsTrend(): void {
    try {
        $pdo = getDBConnection();
        respondSuccess(fetchApplicationsTrend($pdo), 'Applications trend retrieved successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to retrieve applications trend', ['error' => $e->getMessage()]);
    }
}

function hrGetTopJobs(): void {
    try {
        $pdo = getDBConnection();
        respondSuccess(fetchTopJobs($pdo), 'Top jobs retrieved successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to retrieve top jobs', ['error' => $e->getMessage()]);
    }
}

function hrGetSkillMatchDistribution(): void {
    try {
        $pdo = getDBConnection();
        respondSuccess(fetchSkillMatchDistribution($pdo), 'Skill match distribution retrieved successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to retrieve skill match distribution', ['error' => $e->getMessage()]);
    }
}

function hrGetRecentActivity(): void {
    try {
        $pdo = getDBConnection();
        respondSuccess(fetchRecentActivity($pdo), 'Recent activity retrieved successfully');
    } catch (Exception $e) {
        respondError(500, 'Failed to retrieve recent activity', ['error' => $e->getMessage()]);
    }
}

// Helper functions
function fetchSummary($pdo): array {
    $stmt = $pdo->query(
        "SELECT 
            (SELECT COUNT(*) FROM jobs WHERE status = 'active') as total_jobs,
            (SELECT COUNT(*) FROM applications) as total_applications,
            (SELECT COUNT(*) FROM applications WHERE status = 'Shortlisted') as shortlisted_count,
            (SELECT COUNT(*) FROM applications WHERE status = 'Interview Scheduled') as interview_count,
            (SELECT COUNT(*) FROM interviews WHERE interview_status = 'Completed') as completed_interviews,
            (SELECT COUNT(*) FROM users WHERE role = 'candidate') as total_candidates"
    );
    
    return $stmt->fetch() ?? [];
}

function fetchTopJobs($pdo): array {
    $stmt = $pdo->query(
        "SELECT j.job_id, j.title, j.category, COUNT(DISTINCT a.application_id) as applications,
                COUNT(DISTINCT CASE WHEN a.status = 'Shortlisted' THEN a.application_id END) as shortlisted,
                COUNT(DISTINCT CASE WHEN a.status = 'Interview Scheduled' THEN a.application_id END) as interviewing,
                AVG(a.match_percentage) as avg_match
         FROM jobs j 
         LEFT JOIN applications a ON j.job_id = a.job_id 
         WHERE j.status = 'active'
         GROUP BY j.job_id 
         ORDER BY applications DESC 
         LIMIT 5"
    );
    
    return $stmt->fetchAll() ?? [];
}

function fetchApplicationsTrend($pdo): array {
    // Get applications trend for last 30 days
    $stmt = $pdo->query(
        "SELECT DATE(applied_at) as date, COUNT(*) as count 
         FROM applications 
         WHERE applied_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
         GROUP BY DATE(applied_at)
         ORDER BY date ASC"
    );
    
    return $stmt->fetchAll() ?? [];
}

function fetchSkillMatchDistribution($pdo): array {
    // Categorize applications by match percentage
    $stmt = $pdo->query(
        "SELECT 
            SUM(CASE WHEN match_percentage >= 90 THEN 1 ELSE 0 END) as excellent,
            SUM(CASE WHEN match_percentage >= 75 AND match_percentage < 90 THEN 1 ELSE 0 END) as good,
            SUM(CASE WHEN match_percentage >= 50 AND match_percentage < 75 THEN 1 ELSE 0 END) as average,
            SUM(CASE WHEN match_percentage < 50 THEN 1 ELSE 0 END) as poor
         FROM applications"
    );
    
    $data = $stmt->fetch() ?? [];
    
    return [
        ['label' => 'Excellent Match (90%+)', 'value' => (int)($data['excellent'] ?? 0), 'color' => 'emerald'],
        ['label' => 'Good Match (75%-90%)', 'value' => (int)($data['good'] ?? 0), 'color' => 'blue'],
        ['label' => 'Average Match (50%-75%)', 'value' => (int)($data['average'] ?? 0), 'color' => 'amber'],
        ['label' => 'Poor Match (<50%)', 'value' => (int)($data['poor'] ?? 0), 'color' => 'red']
    ];
}

function fetchRecentActivity($pdo): array {
    // Get recent activities
    $stmt = $pdo->query(
        "SELECT 'Application Submitted' as activity, u.full_name, j.title, a.applied_at as timestamp, 'new' as type
         FROM applications a 
         JOIN users u ON a.candidate_id = u.user_id 
         JOIN jobs j ON a.job_id = j.job_id 
         WHERE a.applied_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
         
         UNION ALL
         
         SELECT 'Interview Scheduled' as activity, u.full_name, j.title, i.interview_date as timestamp, 'interview' as type
         FROM interviews i 
         JOIN applications a ON i.application_id = a.application_id 
         JOIN users u ON a.candidate_id = u.user_id 
         JOIN jobs j ON a.job_id = j.job_id 
         WHERE i.interview_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)
         
         UNION ALL
         
         SELECT 'Job Posted' as activity, u.full_name, j.title, j.created_at as timestamp, 'job' as type
         FROM jobs j 
         JOIN users u ON j.created_by = u.user_id 
         WHERE j.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
         
         ORDER BY timestamp DESC 
         LIMIT 10"
    );
    
    return $stmt->fetchAll() ?? [];
}
