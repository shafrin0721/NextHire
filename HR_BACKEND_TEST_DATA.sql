-- NextHire HR Backend Test Data
-- Run these queries in phpMyAdmin after importing nexthire_import.sql

-- ============================================
-- 1. CREATE TEST HR USERS
-- ============================================

INSERT INTO users (full_name, email, password, phone, role, is_active) 
VALUES 
('Sarah Johnson', 'sarah.hr@example.com', '$2y$10$2/jir2OYiBhRDSwsYLGnSuLH..Ie/r70.qJnK6SwFd1Np/C0lhkxO', '+1 (555) 111-2222', 'hr', 1),
('Mike Chen', 'mike.hr@example.com', '$2y$10$2/jir2OYiBhRDSwsYLGnSuLH..Ie/r70.qJnK6SwFd1Np/C0lhkxO', '+1 (555) 222-3333', 'hr', 1),
('Emily Davis', 'emily.admin@example.com', '$2y$10$2/jir2OYiBhRDSwsYLGnSuLH..Ie/r70.qJnK6SwFd1Np/C0lhkxO', '+1 (555) 333-4444', 'admin', 1)
ON DUPLICATE KEY UPDATE
	full_name = VALUES(full_name),
	password = VALUES(password),
	phone = VALUES(phone),
	role = VALUES(role),
	is_active = VALUES(is_active);

-- Password for all: password123

-- ============================================
-- 2. CREATE CANDIDATE USERS
-- ============================================

INSERT INTO users (full_name, email, password, phone, role, is_active) 
VALUES 
('Alexander Thomsen', 'alex.thomsen@example.com', '$2y$10$2/jir2OYiBhRDSwsYLGnSuLH..Ie/r70.qJnK6SwFd1Np/C0lhkxO', '+1 (555) 123-4567', 'candidate', 1),
('Sofia Rodriguez', 'sofia.r@example.com', '$2y$10$2/jir2OYiBhRDSwsYLGnSuLH..Ie/r70.qJnK6SwFd1Np/C0lhkxO', '+1 (555) 234-5678', 'candidate', 1),
('Marcus Aurelius', 'marcus.a@example.com', '$2y$10$2/jir2OYiBhRDSwsYLGnSuLH..Ie/r70.qJnK6SwFd1Np/C0lhkxO', '+1 (555) 345-6789', 'candidate', 1),
('Elena Gilbert', 'elena.g@example.com', '$2y$10$2/jir2OYiBhRDSwsYLGnSuLH..Ie/r70.qJnK6SwFd1Np/C0lhkxO', '+1 (555) 456-7890', 'candidate', 1),
('David Beckham', 'david.b@example.com', '$2y$10$2/jir2OYiBhRDSwsYLGnSuLH..Ie/r70.qJnK6SwFd1Np/C0lhkxO', '+1 (555) 567-8901', 'candidate', 1),
('Isabella Swan', 'bella.s@example.com', '$2y$10$2/jir2OYiBhRDSwsYLGnSuLH..Ie/r70.qJnK6SwFd1Np/C0lhkxO', '+1 (555) 678-9012', 'candidate', 1)
ON DUPLICATE KEY UPDATE
	full_name = VALUES(full_name),
	password = VALUES(password),
	phone = VALUES(phone),
	role = VALUES(role),
	is_active = VALUES(is_active);

-- Note: Use user email lookups to avoid FK failures when auto-increment IDs differ.
INSERT INTO candidate_profiles (
	candidate_id,
	date_of_birth,
	gender,
	address,
	education,
	experience_years,
	portfolio_link,
	certifications_count
)
SELECT u.user_id, p.date_of_birth, p.gender, p.address, p.education, p.experience_years, p.portfolio_link, p.certifications_count
FROM (
	SELECT 'alex.thomsen@example.com' AS email, '1990-05-15' AS date_of_birth, 'Male' AS gender, '123 Tech Street, San Francisco' AS address, 'BS Computer Science' AS education, 8 AS experience_years, 'https://alex.dev' AS portfolio_link, 3 AS certifications_count
	UNION ALL SELECT 'sofia.r@example.com', '1992-03-22', 'Female', '456 Design Ave, New York', 'BFA in Design', 5, 'https://sofia.design', 2
	UNION ALL SELECT 'marcus.a@example.com', '1985-08-10', 'Male', '789 Backend Blvd, Seattle', 'MS Computer Science', 12, 'https://marcus.dev', 5
	UNION ALL SELECT 'elena.g@example.com', '1994-11-18', 'Female', '321 Marketing Dr, Boston', 'BA Marketing', 4, 'https://elena.marketing', 1
	UNION ALL SELECT 'david.b@example.com', '1993-07-30', 'Male', '654 QA Lane, Austin', 'BS Software Engineering', 6, 'https://david.qa', 4
	UNION ALL SELECT 'bella.s@example.com', '1995-01-25', 'Female', '987 Data St, Denver', 'BS Statistics', 3, 'https://bella.data', 2
) p
JOIN users u ON u.email = p.email AND u.role = 'candidate'
ON DUPLICATE KEY UPDATE
	date_of_birth = VALUES(date_of_birth),
	gender = VALUES(gender),
	address = VALUES(address),
	education = VALUES(education),
	experience_years = VALUES(experience_years),
	portfolio_link = VALUES(portfolio_link),
	certifications_count = VALUES(certifications_count);

-- ============================================
-- 4. CREATE TEST JOBS
-- ============================================

INSERT INTO jobs (title, description, requirements, category, location, salary_range, experience_required, status, expiration_date, created_by)
SELECT
	j.title,
	j.description,
	j.requirements,
	j.category,
	j.location,
	j.salary_range,
	j.experience_required,
	'active',
	DATE_ADD(NOW(), INTERVAL 30 DAY),
	creator.user_id
FROM (
	SELECT 'Senior Frontend Engineer' AS title, 'We are looking for an experienced frontend engineer to lead our UI team. You will build responsive web applications using React and TypeScript.' AS description, '8+ years with React, TypeScript, Redux, modern CSS frameworks' AS requirements, 'Engineering' AS category, 'Remote' AS location, 'LKR 120,000 - LKR 150,000' AS salary_range, 8 AS experience_required, 'sarah.hr@example.com' AS creator_email
	UNION ALL SELECT 'UI/UX Designer', 'Join our creative team as a UX Designer to craft seamless and intuitive user experiences across web and mobile platforms.', '5+ years in UX/UI design, proficiency in Figma and Sketch, user research experience', 'Design', 'San Francisco', 'LKR 90,000 - LKR 110,000', 5, 'sarah.hr@example.com'
	UNION ALL SELECT 'Backend Architect', 'Lead our cloud infrastructure and automation strategies. Design and implement scalable backend systems.', '10+ years backend development, AWS or GCP, Kubernetes, microservices architecture', 'Engineering', 'Remote', 'LKR 160,000 - LKR 190,000', 10, 'sarah.hr@example.com'
	UNION ALL SELECT 'Product Manager', 'Drive our product strategy and growth. Collaborate with engineering and design teams to build innovative solutions.', '6+ years in product management, SaaS experience, data-driven decision making', 'Product', 'New York', 'LKR 100,000 - LKR 130,000', 6, 'mike.hr@example.com'
	UNION ALL SELECT 'Data Scientist', 'Build and maintain data pipelines and analytics infrastructure. Create models to drive business insights.', '5+ years with Python, SQL, machine learning, Apache Spark, cloud data services like BigQuery', 'Engineering', 'Remote', 'LKR 130,000 - LKR 160,000', 5, 'sarah.hr@example.com'
	UNION ALL SELECT 'JavaScript Developer', 'Build modern web applications with JavaScript and Node.js. Work on both frontend and backend systems.', '3+ years with JavaScript, Node.js, React or Vue, strong fundamentals', 'Engineering', 'Remote', 'LKR 70,000 - LKR 95,000', 3, 'mike.hr@example.com'
) j
JOIN users creator ON creator.email = j.creator_email
LEFT JOIN jobs existing ON existing.title = j.title
WHERE existing.job_id IS NULL;

-- ============================================
-- 5. ADD JOB SKILLS
-- ============================================

INSERT INTO job_skills (job_id, skill_name, required_level)
SELECT j.job_id, s.skill_name, s.required_level
FROM (
	SELECT 'Senior Frontend Engineer' AS job_title, 'React' AS skill_name, 'advanced' AS required_level
	UNION ALL SELECT 'Senior Frontend Engineer', 'TypeScript', 'advanced'
	UNION ALL SELECT 'Senior Frontend Engineer', 'JavaScript', 'advanced'
	UNION ALL SELECT 'Senior Frontend Engineer', 'CSS/Tailwind', 'intermediate'
	UNION ALL SELECT 'Senior Frontend Engineer', 'Redux', 'advanced'
	UNION ALL SELECT 'UI/UX Designer', 'Figma', 'advanced'
	UNION ALL SELECT 'UI/UX Designer', 'UI Design', 'advanced'
	UNION ALL SELECT 'UI/UX Designer', 'User Research', 'intermediate'
	UNION ALL SELECT 'UI/UX Designer', 'Prototyping', 'intermediate'
	UNION ALL SELECT 'Backend Architect', 'Node.js', 'advanced'
	UNION ALL SELECT 'Backend Architect', 'AWS', 'advanced'
	UNION ALL SELECT 'Backend Architect', 'Kubernetes', 'advanced'
	UNION ALL SELECT 'Backend Architect', 'PostgreSQL', 'advanced'
	UNION ALL SELECT 'Backend Architect', 'Docker', 'intermediate'
	UNION ALL SELECT 'Product Manager', 'Product Strategy', 'advanced'
	UNION ALL SELECT 'Product Manager', 'Data Analysis', 'intermediate'
	UNION ALL SELECT 'Product Manager', 'Market Research', 'intermediate'
	UNION ALL SELECT 'Data Scientist', 'Python', 'advanced'
	UNION ALL SELECT 'Data Scientist', 'SQL', 'advanced'
	UNION ALL SELECT 'Data Scientist', 'Machine Learning', 'advanced'
	UNION ALL SELECT 'Data Scientist', 'Apache Spark', 'intermediate'
	UNION ALL SELECT 'JavaScript Developer', 'JavaScript', 'advanced'
	UNION ALL SELECT 'JavaScript Developer', 'Node.js', 'advanced'
	UNION ALL SELECT 'JavaScript Developer', 'React', 'intermediate'
	UNION ALL SELECT 'JavaScript Developer', 'REST APIs', 'intermediate'
) s
JOIN jobs j ON j.title = s.job_title
LEFT JOIN job_skills js ON js.job_id = j.job_id AND js.skill_name = s.skill_name
WHERE js.id IS NULL;

-- ============================================
-- 6. CREATE TEST APPLICATIONS
-- ============================================

INSERT INTO applications (job_id, candidate_id, cv_file, status, match_percentage, skill_score, anonymous_mode)
SELECT j.job_id, u.user_id, a.cv_file, a.status, a.match_percentage, a.skill_score, 0
FROM (
	SELECT 'Senior Frontend Engineer' AS job_title, 'alex.thomsen@example.com' AS candidate_email, 'alex_cv.pdf' AS cv_file, 'Shortlisted' AS status, 92 AS match_percentage, 95 AS skill_score
	UNION ALL SELECT 'Senior Frontend Engineer', 'sofia.r@example.com', 'sofia_cv.pdf', 'Pending', 65, 60
	UNION ALL SELECT 'Senior Frontend Engineer', 'david.b@example.com', 'david_cv.pdf', 'Rejected', 45, 35
	UNION ALL SELECT 'UI/UX Designer', 'sofia.r@example.com', 'sofia_cv.pdf', 'Interview Scheduled', 88, 90
	UNION ALL SELECT 'UI/UX Designer', 'elena.g@example.com', 'elena_cv.pdf', 'Shortlisted', 75, 70
	UNION ALL SELECT 'Backend Architect', 'marcus.a@example.com', 'marcus_cv.pdf', 'Shortlisted', 96, 98
	UNION ALL SELECT 'Backend Architect', 'alex.thomsen@example.com', 'alex_cv.pdf', 'Pending', 78, 75
	UNION ALL SELECT 'Product Manager', 'elena.g@example.com', 'elena_cv.pdf', 'Shortlisted', 82, 80
	UNION ALL SELECT 'Product Manager', 'alex.thomsen@example.com', 'alex_cv.pdf', 'Rejected', 55, 50
	UNION ALL SELECT 'Data Scientist', 'bella.s@example.com', 'bella_cv.pdf', 'Shortlisted', 85, 88
	UNION ALL SELECT 'Data Scientist', 'marcus.a@example.com', 'marcus_cv.pdf', 'Pending', 70, 72
	UNION ALL SELECT 'JavaScript Developer', 'alex.thomsen@example.com', 'alex_cv.pdf', 'Interview Scheduled', 94, 96
	UNION ALL SELECT 'JavaScript Developer', 'david.b@example.com', 'david_cv.pdf', 'Shortlisted', 79, 81
) a
JOIN jobs j ON j.title = a.job_title
JOIN users u ON u.email = a.candidate_email AND u.role = 'candidate'
LEFT JOIN applications ap ON ap.job_id = j.job_id AND ap.candidate_id = u.user_id
WHERE ap.application_id IS NULL;

INSERT INTO interviews (application_id, interview_date, interview_status, interview_notes)
SELECT
	ap.application_id,
	i.interview_date,
	'Scheduled',
	CONCAT('Type: ', i.interview_type, ' | Location: ', i.location, ' | Notes: ', i.interview_notes)
FROM (
	SELECT 'Senior Frontend Engineer' AS job_title, 'alex.thomsen@example.com' AS candidate_email, DATE_ADD(NOW(), INTERVAL 5 DAY) AS interview_date, 'Video Call' AS interview_type, 'https://zoom.us/meeting1' AS location, 'Initial technical screening' AS interview_notes
	UNION ALL SELECT 'UI/UX Designer', 'sofia.r@example.com', DATE_ADD(NOW(), INTERVAL 3 DAY), 'Video Call', 'https://meet.google.com/sofia-design', 'Design portfolio review'
	UNION ALL SELECT 'JavaScript Developer', 'alex.thomsen@example.com', DATE_ADD(NOW(), INTERVAL 7 DAY), 'On-site', 'NYC Office, Conference Room A', 'Final round with CTO'
) i
JOIN jobs j ON j.title = i.job_title
JOIN users u ON u.email = i.candidate_email
JOIN applications ap ON ap.job_id = j.job_id AND ap.candidate_id = u.user_id
LEFT JOIN interviews iv ON iv.application_id = ap.application_id
WHERE iv.interview_id IS NULL;

-- ============================================
-- TEST CREDENTIALS
-- ============================================

-- HR Users (for /api/hr/auth/login):
-- Email: sarah.hr@example.com
-- Password: password123

-- Email: mike.hr@example.com
-- Password: password123

-- Admin User:
-- Email: emily.admin@example.com
-- Password: password123

-- ============================================
-- USEFUL QUERIES FOR TESTING
-- ============================================

-- Get all HR users:
-- SELECT * FROM users WHERE role IN ('hr', 'admin');

-- Get all candidates:
-- SELECT * FROM users WHERE role = 'candidate';

-- Get all active jobs:
-- SELECT * FROM jobs WHERE status = 'active';

-- Get applications for a job:
-- SELECT a.*, u.full_name, u.email FROM applications a JOIN users u ON a.candidate_id = u.user_id WHERE a.job_id = 1;

-- Get all scheduled interviews:
-- SELECT i.*, u.full_name, j.title FROM interviews i JOIN applications a ON i.application_id = a.application_id JOIN users u ON a.candidate_id = u.user_id JOIN jobs j ON a.job_id = j.job_id;

-- Count applications by status:
-- SELECT status, COUNT(*) FROM applications GROUP BY status;


