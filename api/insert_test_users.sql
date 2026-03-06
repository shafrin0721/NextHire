-- Insert test users for NextHire login testing
-- Password for all users is: Test@123

USE nexthire_db;

-- Delete any existing test users to avoid conflicts
DELETE FROM users WHERE email IN ('admin@nexthire.com', 'hr@nexthire.com', 'candidate@nexthire.com');

-- Insert Admin user
-- Email: admin@nexthire.com
-- Password: Test@123
INSERT INTO users (full_name, email, password, phone, role, is_active, created_at) VALUES
('Admin User', 'admin@nexthire.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-555-0001', 'admin', 1, NOW());

-- Insert HR Manager user  
-- Email: hr@nexthire.com
-- Password: Test@123
INSERT INTO users (full_name, email, password, phone, role, is_active, created_at) VALUES
('HR Manager', 'hr@nexthire.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-555-0002', 'hr', 1, NOW());

-- Insert Candidate user
-- Email: candidate@nexthire.com
-- Password: Test@123
INSERT INTO users (full_name, email, password, phone, role, is_active, created_at) VALUES
('John Candidate', 'candidate@nexthire.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1-555-0003', 'candidate', 1, NOW());

-- Verify insertions
SELECT user_id, full_name, email, role, is_active FROM users WHERE email IN ('admin@nexthire.com', 'hr@nexthire.com', 'candidate@nexthire.com');
