-- Chatbot System for NextHire
USE nexthire_db;

-- Chatbot conversations table
CREATE TABLE IF NOT EXISTS `chatbot_conversations` (
  `conversation_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `session_id` varchar(100) NOT NULL,
  `started_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_activity` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`conversation_id`),
  KEY `session_id` (`session_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Chatbot messages table
CREATE TABLE IF NOT EXISTS `chatbot_messages` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `conversation_id` int(11) NOT NULL,
  `sender_type` enum('user','bot') NOT NULL,
  `message_text` text NOT NULL,
  `intent` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`message_id`),
  KEY `conversation_id` (`conversation_id`),
  FOREIGN KEY (`conversation_id`) REFERENCES `chatbot_conversations` (`conversation_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Chatbot knowledge base (FAQ)
CREATE TABLE IF NOT EXISTS `chatbot_knowledge` (
  `knowledge_id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  `keywords` text NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `priority` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`knowledge_id`),
  KEY `category` (`category`),
  KEY `is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample knowledge base
INSERT INTO `chatbot_knowledge` (`category`, `keywords`, `question`, `answer`, `priority`, `is_active`) VALUES
('greeting', 'hello,hi,hey,good morning,good afternoon,greetings', 'Hello', 'Hello! 👋 Welcome to NextHire! I''m here to help you with job applications, interview scheduling, and any questions about our platform. How can I assist you today?', 100, 1),

('jobs', 'job,jobs,opening,openings,position,positions,vacancy,vacancies,career,careers,hiring', 'Available jobs', 'I can help you explore our job openings! We have various positions available. You can:\n\n• Browse all jobs on our Jobs page\n• Filter by category, location, or experience level\n• Apply directly online\n\nWould you like to know about a specific job category?', 90, 1),

('apply', 'apply,application,how to apply,submit,resume,cv,submit application', 'How to apply', 'To apply for a job at NextHire:\n\n1. Browse available positions\n2. Click on the job you''re interested in\n3. Click "Apply Now" button\n4. Fill in your details and upload your CV\n5. Submit your application\n\nYou''ll receive a confirmation email once submitted. Our HR team will review your application within 48 hours.', 90, 1),

('interview', 'interview,schedule,meeting,appointment,interview process', 'Interview information', 'Great question about interviews! 📅\n\nOur interview process typically involves:\n1. Phone screening (15-20 mins)\n2. Technical/skill assessment\n3. Panel interview with the team\n4. Final discussion with HR\n\nYou''ll receive interview invitations via email with all the details. You can also check your dashboard for scheduled interviews.', 80, 1),

('status', 'status,application status,check status,track,tracking,where is my application', 'Application status', 'To check your application status:\n\n1. Login to your account\n2. Go to "My Applications" in your dashboard\n3. View the status of each application\n\nStatus meanings:\n• Pending - Under review\n• Shortlisted - Selected for next round\n• Interview Scheduled - Check your email for details\n• Selected - Congratulations! 🎉\n• Rejected - We appreciate your interest', 85, 1),

('contact', 'contact,support,help,email,phone,reach,get in touch', 'Contact information', 'You can reach our team at:\n\n📧 Email: support@nexthire.com\n📞 Phone: +1 (555) 123-4567\n🕐 Hours: Mon-Fri, 9 AM - 6 PM\n\nOr use our Contact page for specific inquiries. We typically respond within 24 hours!', 70, 1),

('account', 'account,register,signup,login,password,forgot password,create account', 'Account help', 'For account-related issues:\n\n• Create Account: Click "Sign Up" and fill in your details\n• Login Issues: Use "Forgot Password" to reset\n• Update Profile: Login → Dashboard → Settings\n\nNeed help with something specific?', 75, 1),

('skills', 'skill test,assessment,mcq,test,exam,quiz', 'Skill tests', 'Some positions require skill assessments. 📝\n\nIf selected, you''ll receive:\n• Email invitation with test link\n• Test duration and question count\n• Deadline to complete\n\nPrepare well - you typically get one attempt per test. Good luck!', 65, 1),

('salary', 'salary,pay,compensation,package,benefits,money', 'Salary information', 'Salary details are included in each job posting. Our packages typically include:\n\n💰 Competitive base salary\n🏥 Health insurance\n📚 Learning & development budget\n🏖️ Paid time off\n🎯 Performance bonuses\n\nSpecific details will be discussed during the interview process.', 60, 1),

('remote', 'remote,work from home,wfh,hybrid,location,office', 'Work location', 'We offer flexible work arrangements:\n\n🏢 Office-based positions\n🏡 Remote/Work from home\n🔄 Hybrid options\n\nThe work arrangement is specified in each job posting. Filter by "Remote" on our Jobs page to see remote opportunities!', 60, 1),

('thanks', 'thank,thanks,appreciate,thank you', 'Thank you', 'You''re welcome! 😊 Is there anything else I can help you with today?', 50, 1),

('bye', 'bye,goodbye,see you,exit,close,quit', 'Goodbye', 'Thank you for chatting with me! If you need anything else, I''m always here to help. Best of luck with your job search! 👋', 50, 1);
