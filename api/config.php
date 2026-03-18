<?php
/**
 * Database Configuration for NextHire
 * MySQL Connection Settings
 */

// Database credentials (adjust these for your XAMPP setup)
define('DB_HOST', 'localhost');
define('DB_NAME', 'nexthire_db');
define('DB_USER', 'root');
define('DB_PASS', '');

define('JWT_SECRET', 'nexthire_secret_key_2024');

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database connection
function getDBConnection() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
        exit;
    }
}

// Initialize database tables
function initializeDatabase() {
    $pdo = getDBConnection();
    
    // Users table
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        role ENUM('admin', 'hr', 'candidate') DEFAULT 'hr',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Jobs table
    $pdo->exec("CREATE TABLE IF NOT EXISTS jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        department VARCHAR(100) NOT NULL,
        location VARCHAR(100) NOT NULL,
        type ENUM('Full-Time', 'Part-Time', 'Contract', 'Internship') DEFAULT 'Full-Time',
        description TEXT,
        requirements TEXT,
        skills TEXT,
        status ENUM('Active', 'Inactive') DEFAULT 'Active',
        expiration_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Applications table
    $pdo->exec("CREATE TABLE IF NOT EXISTS applications (
        id VARCHAR(20) PRIMARY KEY,
        candidate_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        job_id INT NOT NULL,
        position VARCHAR(200) NOT NULL,
        experience VARCHAR(50),
        education VARCHAR(200),
        skills TEXT,
        cv_path VARCHAR(255),
        skill_match VARCHAR(10),
        test_score VARCHAR(10),
        status ENUM('Pending', 'Shortlisted', 'Rejected', 'Interview Scheduled', 'Selected') DEFAULT 'Pending',
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (job_id) REFERENCES jobs(id)
    )");
    
    // Anonymous screening table
    $pdo->exec("CREATE TABLE IF NOT EXISTS anonymous_screening (
        id VARCHAR(20) PRIMARY KEY,
        experience VARCHAR(50),
        education VARCHAR(200),
        certifications VARCHAR(200),
        skills TEXT,
        skill_match VARCHAR(10),
        test_score VARCHAR(10),
        revealed TINYINT DEFAULT 0,
        identity VARCHAR(100),
        revealed_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Skill tests table
    $pdo->exec("CREATE TABLE IF NOT EXISTS skill_tests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        position VARCHAR(100),
        questions INT DEFAULT 0,
        description TEXT,
        status ENUM('Active', 'Inactive') DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Interviews table
    $pdo->exec("CREATE TABLE IF NOT EXISTS interviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        candidate_id VARCHAR(20) NOT NULL,
        candidate_name VARCHAR(100) NOT NULL,
        position VARCHAR(200) NOT NULL,
        interview_date DATE NOT NULL,
        interview_time TIME NOT NULL,
        interview_type ENUM('Technical', 'HR Round', 'Final Round', 'Phone Screening') DEFAULT 'Technical',
        location VARCHAR(200),
        notes TEXT,
        status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Identity reveal logs
    $pdo->exec("CREATE TABLE IF NOT EXISTS identity_reveal_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        candidate_id VARCHAR(20) NOT NULL,
        identity VARCHAR(100) NOT NULL,
        revealed_by VARCHAR(50) NOT NULL,
        revealed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Insert default HR admin if not exists
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = 'hradmin'");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $hashedPassword = password_hash('hr123', PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (username, password, name, email, role) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute(['hradmin', $hashedPassword, 'HR Admin', 'hr@nexthire.com', 'admin']);
    }
    
    // Insert sample jobs if empty
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM jobs");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $sampleJobs = [
            ['Frontend Developer', 'IT', 'Remote', 'Full-Time', 'We are looking for an experienced Frontend Developer proficient in React, JavaScript, and CSS.', 'React, JavaScript, CSS, HTML', '2024-12-31'],
            ['Backend Developer', 'IT', 'Colombo', 'Full-Time', 'Backend Developer needed with experience in Node.js, Python, and SQL.', 'Node.js, Python, SQL, Express', '2024-11-30'],
            ['HR Executive', 'Human Resources', 'Colombo', 'Full-Time', 'HR Executive needed for recruitment and employee management.', 'Communication, HRIS, Recruitment', '2024-12-15'],
            ['UX Designer', 'Design', 'Remote', 'Part-Time', 'UX Designer needed with experience in Figma and UI/UX design.', 'Figma, UI/UX, Adobe XD', '2024-11-20'],
            ['Data Analyst', 'Data', 'Colombo', 'Full-Time', 'Data Analyst needed with Python, SQL, and Tableau skills.', 'Python, SQL, Tableau, Excel', '2024-10-31']
        ];
        
        $stmt = $pdo->prepare("INSERT INTO jobs (title, department, location, type, description, skills, expiration_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'Active')");
        foreach ($sampleJobs as $job) {
            $stmt->execute($job);
        }
    }
    
    // Insert sample applications if empty
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM applications");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $sampleApps = [
            ['C-1023', 'John Doe', 'john@example.com', '+1 555-0101', 1, 'Frontend Developer', '3 Years', 'BSc Computer Science', 'React,JavaScript,CSS', '85%', '82%', 'Pending'],
            ['C-1045', 'Jane Smith', 'jane@example.com', '+1 555-0102', 2, 'Backend Developer', '5 Years', 'BSc Software Engineering', 'Node.js,Python,SQL', '78%', '75%', 'Shortlisted'],
            ['C-1067', 'Mike Johnson', 'mike@example.com', '+1 555-0103', 1, 'Full Stack Developer', '4 Years', 'BSc IT', 'React,Node.js', '82%', '79%', 'Interview Scheduled'],
            ['C-1089', 'Sarah Williams', 'sarah@example.com', '+1 555-0104', 2, 'DevOps Engineer', '6 Years', 'BSc Engineering', 'AWS,Docker,Kubernetes', '91%', '88%', 'Selected'],
            ['C-1102', 'Tom Brown', 'tom@example.com', '+1 555-0105', 5, 'Data Analyst', '2 Years', 'BSc Statistics', 'Python,Excel,Tableau', '72%', '70%', 'Rejected']
        ];
        
        $stmt = $pdo->prepare("INSERT INTO applications (id, candidate_name, email, phone, job_id, position, experience, education, skills, skill_match, test_score, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        foreach ($sampleApps as $app) {
            $stmt->execute($app);
        }
    }
    
    // Insert sample anonymous screening if empty
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM anonymous_screening");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $sampleScreening = [
            ['C-2045', '4 Years', 'BSc Computer Science', 'AWS Certified Developer', 'React,Node.js', '88%', '84%'],
            ['C-2067', '3 Years', 'BSc Software Engineering', 'Google UX Certificate', 'Figma,UI/UX', '82%', '80%'],
            ['C-2089', '5 Years', 'BSc Information Technology', 'Microsoft Certified', 'Python,SQL', '76%', '74%'],
            ['C-2102', '2 Years', 'BSc Computer Science', 'None', 'Excel,Tableau', '71%', '68%']
        ];
        
        $stmt = $pdo->prepare("INSERT INTO anonymous_screening (id, experience, education, certifications, skills, skill_match, test_score) VALUES (?, ?, ?, ?, ?, ?, ?)");
        foreach ($sampleScreening as $s) {
            $stmt->execute($s);
        }
    }
    
    // Insert sample skill tests if empty
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM skill_tests");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $sampleTests = [
            ['Frontend Technical Test', 'Frontend Developer', 20, 'Test for frontend development skills'],
            ['Backend Logic Test', 'Backend Developer', 25, 'Test for backend development skills'],
            ['Python Coding Challenge', 'Data Analyst', 15, 'Python coding challenge'],
            ['System Design Test', 'Full Stack Developer', 30, 'System design assessment']
        ];
        
        $stmt = $pdo->prepare("INSERT INTO skill_tests (name, position, questions, description, status) VALUES (?, ?, ?, ?, 'Active')");
        foreach ($sampleTests as $t) {
            $stmt->execute($t);
        }
    }
    
    // Insert sample interviews if empty
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM interviews");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $sampleInterviews = [
            ['C-1067', 'Mike Johnson', 'Full Stack Developer', '2024-01-25', '10:00:00', 'Technical', 'Google Meet', 'Focus on React and Node.js skills'],
            ['C-1045', 'Jane Smith', 'Backend Developer', '2024-01-26', '14:00:00', 'Technical', 'Office - Room 301', 'Python and database questions']
        ];
        
        $stmt = $pdo->prepare("INSERT INTO interviews (candidate_id, candidate_name, position, interview_date, interview_time, interview_type, location, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        foreach ($sampleInterviews as $i) {
            $stmt->execute($i);
        }
    }
}

// Legacy initializer kept for backward compatibility.
// It is intentionally not auto-run because the project uses nexthire_import.sql schema.

