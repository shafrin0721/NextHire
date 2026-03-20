<?php
/**
 * Create/Update NextHire Admin User (Test@123)
 * Visit: http://localhost/api/create_admin.php
 * Credentials: admin@nexthire.com / Test@123 | hr@nexthire.com / Test@123 | candidate@nexthire.com / Test@123
 */

declare(strict_types=1);

require __DIR__ . "/config/db.php";

$adminEmail = "admin@nexthire.com";
$adminPassword = "Test@123";
$adminName = "Admin User";

try {
    // Hash the password
    $hashedPassword = password_hash($adminPassword, PASSWORD_BCRYPT);

    // Check if admin already exists
    $stmt = $pdo->prepare("SELECT user_id FROM users WHERE email = :email LIMIT 1");
    $stmt->execute([":email" => $adminEmail]);
    $existing = $stmt->fetch();

    if ($existing) {
        // Update existing admin
        $stmt = $pdo->prepare("
            UPDATE users 
            SET password = :password, 
                role = 'admin', 
                is_active = 1,
                full_name = :name
            WHERE email = :email
        ");
        $stmt->execute([
            ":password" => $hashedPassword,
            ":name" => $adminName,
            ":email" => $adminEmail
        ]);
        
        echo "<!DOCTYPE html>
<html>
<head>
    <title>Admin User Updated</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
        .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .success { color: #10b981; font-size: 24px; margin-bottom: 20px; }
        .info { background: #eff6ff; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #3b82f6; }
        code { background: #f3f4f6; padding: 2px 8px; border-radius: 3px; font-family: monospace; }
        a { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; }
        a:hover { background: #2563eb; }
    </style>
</head>
<body>
    <div class='card'>
        <div class='success'>✅ Admin user updated successfully!</div>
        <div class='info'>
            <strong>Login Credentials:</strong><br><br>
            Email: <code>$adminEmail</code><br>
            Password: <code>$adminPassword</code><br>
            Role: <code>admin</code>
        </div>
        <a href='http://localhost:5173/login'>Go to Login Page →</a>
    </div>
</body>
</html>";
    } else {
        // Insert new admin
        $stmt = $pdo->prepare("
            INSERT INTO users (full_name, email, password, phone, role, is_active)
            VALUES (:name, :email, :password, :phone, 'admin', 1)
        ");
        $stmt->execute([
            ":name" => $adminName,
            ":email" => $adminEmail,
            ":password" => $hashedPassword,
            ":phone" => "+1234567890"
        ]);
        
        echo "<!DOCTYPE html>
<html>
<head>
    <title>Admin User Created</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
        .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .success { color: #10b981; font-size: 24px; margin-bottom: 20px; }
        .info { background: #eff6ff; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #3b82f6; }
        code { background: #f3f4f6; padding: 2px 8px; border-radius: 3px; font-family: monospace; }
        a { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; }
        a:hover { background: #2563eb; }
    </style>
</head>
<body>
    <div class='card'>
        <div class='success'>✅ Admin user created successfully!</div>
        <div class='info'>
            <strong>Login Credentials:</strong><br><br>
            Email: <code>$adminEmail</code><br>
            Password: <code>$adminPassword</code><br>
            Role: <code>admin</code>
        </div>
        <a href='http://localhost:5173/login'>Go to Login Page →</a>
    </div>
</body>
</html>";
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo "<!DOCTYPE html>
<html>
<head>
    <title>Error</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
        .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .error { color: #ef4444; font-size: 24px; margin-bottom: 20px; }
        .details { background: #fef2f2; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ef4444; }
        code { background: #f3f4f6; padding: 2px 8px; border-radius: 3px; font-family: monospace; display: block; margin-top: 10px; }
    </style>
</head>
<body>
    <div class='card'>
        <div class='error'>❌ Database Error</div>
        <div class='details'>
            <strong>Error Message:</strong>
            <code>" . htmlspecialchars($e->getMessage()) . "</code>
        </div>
        <p>Make sure XAMPP MySQL is running and the database 'nexthire_db' exists.</p>
    </div>
</body>
</html>";
}
