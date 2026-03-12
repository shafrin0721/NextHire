-- phpMyAdmin SQL Dump
-- Corrected import with USE database statement

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS nexthire_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nexthire_db;

-- Table structure for table `applications`
CREATE TABLE `applications` (
  `application_id` int(11) NOT NULL,
  `job_id` int(11) DEFAULT NULL,
  `candidate_id` int(11) DEFAULT NULL,
  `cv_file` varchar(255) NOT NULL,
  `status` enum('Pending','Shortlisted','Rejected','Selected','Interview Scheduled') DEFAULT 'Pending',
  `match_percentage` decimal(5,2) DEFAULT 0.00,
  `skill_score` decimal(5,2) DEFAULT 0.00,
  `anonymous_mode` tinyint(1) DEFAULT 1,
  `applied_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `candidate_profiles`
CREATE TABLE `candidate_profiles` (
  `candidate_id` int(11) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `education` text DEFAULT NULL,
  `experience_years` int(11) DEFAULT 0,
  `portfolio_link` varchar(255) DEFAULT NULL,
  `certifications_count` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `contact_messages`
CREATE TABLE `contact_messages` (
  `message_id` int(11) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `interviews`
CREATE TABLE `interviews` (
  `interview_id` int(11) NOT NULL,
  `application_id` int(11) DEFAULT NULL,
  `interview_date` datetime DEFAULT NULL,
  `interview_status` enum('Scheduled','Completed','Cancelled') DEFAULT NULL,
  `interview_notes` text DEFAULT NULL,
  `final_decision` enum('Pending','Selected','Rejected') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `jobs`
CREATE TABLE `jobs` (
  `job_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `requirements` text NOT NULL,
  `salary_range` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `location` varchar(150) DEFAULT NULL,
  `experience_required` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `expiration_date` date DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `job_skills`
CREATE TABLE `job_skills` (
  `id` int(11) NOT NULL,
  `job_id` int(11) DEFAULT NULL,
  `skill_name` varchar(100) DEFAULT NULL,
  `required_level` enum('beginner','intermediate','advanced') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `notifications`
CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `resume_analysis`
CREATE TABLE `resume_analysis` (
  `analysis_id` int(11) NOT NULL,
  `application_id` int(11) DEFAULT NULL,
  `extracted_skills` text DEFAULT NULL,
  `missing_skills` text DEFAULT NULL,
  `match_score` decimal(5,2) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `analyzed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `skill_tests`
CREATE TABLE `skill_tests` (
  `test_id` int(11) NOT NULL,
  `job_id` int(11) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `total_marks` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `test_questions`
CREATE TABLE `test_questions` (
  `question_id` int(11) NOT NULL,
  `test_id` int(11) DEFAULT NULL,
  `question` text NOT NULL,
  `option_a` varchar(255) DEFAULT NULL,
  `option_b` varchar(255) DEFAULT NULL,
  `option_c` varchar(255) DEFAULT NULL,
  `option_d` varchar(255) DEFAULT NULL,
  `correct_answer` enum('A','B','C','D') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `test_results`
CREATE TABLE `test_results` (
  `result_id` int(11) NOT NULL,
  `test_id` int(11) DEFAULT NULL,
  `candidate_id` int(11) DEFAULT NULL,
  `score` decimal(5,2) DEFAULT NULL,
  `completed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for table `users`
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('candidate','admin','hr') NOT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Indexes for table `applications`
ALTER TABLE `applications`
  ADD PRIMARY KEY (`application_id`),
  ADD KEY `job_id` (`job_id`),
  ADD KEY `candidate_id` (`candidate_id`);

-- Indexes for table `candidate_profiles`
ALTER TABLE `candidate_profiles`
  ADD PRIMARY KEY (`candidate_id`);

-- Indexes for table `contact_messages`
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`message_id`);

-- Indexes for table `interviews`
ALTER TABLE `interviews`
  ADD PRIMARY KEY (`interview_id`),
  ADD KEY `application_id` (`application_id`);

-- Indexes for table `jobs`
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`job_id`),
  ADD KEY `created_by` (`created_by`);

-- Indexes for table `job_skills`
ALTER TABLE `job_skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_id` (`job_id`);

-- Indexes for table `notifications`
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `user_id` (`user_id`);

-- Indexes for table `resume_analysis`
ALTER TABLE `resume_analysis`
  ADD PRIMARY KEY (`analysis_id`),
  ADD KEY `application_id` (`application_id`);

-- Indexes for table `skill_tests`
ALTER TABLE `skill_tests`
  ADD PRIMARY KEY (`test_id`),
  ADD KEY `job_id` (`job_id`);

-- Indexes for table `test_questions`
ALTER TABLE `test_questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `test_id` (`test_id`);

-- Indexes for table `test_results`
ALTER TABLE `test_results`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `test_id` (`test_id`),
  ADD KEY `candidate_id` (`candidate_id`);

-- Indexes for table `users`
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

-- AUTO_INCREMENT for dumped tables
ALTER TABLE `applications`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `contact_messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `interviews`
  MODIFY `interview_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `jobs`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `job_skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `resume_analysis`
  MODIFY `analysis_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `skill_tests`
  MODIFY `test_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `test_questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `test_results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

-- Constraints for dumped tables
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`),
  ADD CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`candidate_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `candidate_profiles`
  ADD CONSTRAINT `candidate_profiles_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `interviews`
  ADD CONSTRAINT `interviews_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `applications` (`application_id`);

ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`);

ALTER TABLE `job_skills`
  ADD CONSTRAINT `job_skills_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`) ON DELETE CASCADE;

ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

ALTER TABLE `resume_analysis`
  ADD CONSTRAINT `resume_analysis_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `applications` (`application_id`) ON DELETE CASCADE;

ALTER TABLE `skill_tests`
  ADD CONSTRAINT `skill_tests_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`);

ALTER TABLE `test_questions`
  ADD CONSTRAINT `test_questions_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `skill_tests` (`test_id`) ON DELETE CASCADE;

ALTER TABLE `test_results`
  ADD CONSTRAINT `test_results_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `skill_tests` (`test_id`),
  ADD CONSTRAINT `test_results_ibfk_2` FOREIGN KEY (`candidate_id`) REFERENCES `users` (`user_id`);

COMMIT;
