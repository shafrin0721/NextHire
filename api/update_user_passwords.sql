-- Update passwords for NextHire test accounts (USE insert_test_users.sql instead for fresh Test@123)
-- Credentials: admin@nexthire.com / Test@123 | hr@nexthire.com / Test@123 | candidate@nexthire.com / Test@123
-- Hash for Test@123: $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi

USE nexthire_db;

-- Reset all to Test@123 hash
UPDATE users SET password = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE email IN ('admin@nexthire.com', 'hr@nexthire.com', 'candidate@nexthire.com');

-- Verify
SELECT user_id, full_name, email, role, LEFT(password, 20) AS password_hash_prefix FROM users WHERE email IN ('admin@nexthire.com', 'hr@nexthire.com', 'candidate@nexthire.com');
