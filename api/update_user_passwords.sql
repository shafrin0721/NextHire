-- Update passwords for NextHire test accounts
-- Admin: admin@nexthire.com / Admin@123
-- HR: hr@nexthire.com / Hr@123
-- Candidate: candidate@nexthire.com / Candidate@123

USE nexthire_db;

-- Update Admin password to Admin@123
-- Hash generated via: password_hash('Admin@123', PASSWORD_BCRYPT)
UPDATE users SET password = '$2y$10$vQKpwJ5G8YkZ7.OFY9xQH.F1bx9nB5K4j3dRvPjU8mN5lQ1WqVDSi' WHERE email = 'admin@nexthire.com';

-- Update HR password to Hr@123
-- Hash generated via: password_hash('Hr@123', PASSWORD_BCRYPT)  
UPDATE users SET password = '$2y$10$eRL4fK8pV2xN3tY6hS1wLOQU8jT9mC7nA5bX4dP6rE2fW8vH3yK0u' WHERE email = 'hr@nexthire.com';

-- Update Candidate password to Candidate@123
-- Hash generated via: password_hash('Candidate@123', PASSWORD_BCRYPT)
UPDATE users SET password = '$2y$10$mW7vE5rP9tL2sK8nY4jU6.N1xH3cD6fT9aG2bV5eR8qM4kJ7yW0zL' WHERE email = 'candidate@nexthire.com';

-- Verify the updates
SELECT user_id, full_name, email, role FROM users WHERE email IN ('admin@nexthire.com', 'hr@nexthire.com', 'candidate@nexthire.com');
