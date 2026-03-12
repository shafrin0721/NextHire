<?php
declare(strict_types=1);

require __DIR__ . "/config/cors.php";
require __DIR__ . "/config/db.php";
require __DIR__ . "/utils/response.php";

// Enable error logging
error_log("=== SIGNUP REQUEST START ===");
error_log("Request method: " . $_SERVER["REQUEST_METHOD"]);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  json_response(405, ["status" => "error", "message" => "Method not allowed"]);
}

$data = get_json_input();
error_log("Input data: " . json_encode($data));

$fullName = trim((string)($data["fullName"] ?? ""));
$email    = trim((string)($data["email"] ?? ""));
$password = (string)($data["password"] ?? "");
$role     = trim((string)($data["role"] ?? "candidate"));

error_log("Parsed - Name: $fullName, Email: $email, Role: $role");

if ($fullName === "") {
  error_log("Error: Full name is empty");
  json_response(422, ["status" => "error", "message" => "Full name is required"]);
}
if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  error_log("Error: Invalid email - $email");
  json_response(422, ["status" => "error", "message" => "Valid email is required"]);
}
if ($password === "" || strlen($password) < 6) {
  error_log("Error: Password too short");
  json_response(422, ["status" => "error", "message" => "Password must be at least 6 characters"]);
}
if (!in_array($role, ["candidate", "hr", "admin"], true)) {
  error_log("Error: Invalid role - $role");
  json_response(422, ["status" => "error", "message" => "Invalid role selected"]);
}

// email exists
$stmt = $pdo->prepare("SELECT user_id FROM users WHERE email = :email LIMIT 1");
$stmt->execute([":email" => $email]);
$existing = $stmt->fetch();
if ($existing) {
  error_log("Error: Email already exists - $email (user_id: {$existing['user_id']})");
  json_response(409, ["status" => "error", "message" => "Email already registered. Please use a different email or login."]);
}

error_log("Email check passed - creating user");

// hash password
$hashed = password_hash($password, PASSWORD_BCRYPT);

// insert
try {
  $ins = $pdo->prepare("
    INSERT INTO users (full_name, email, password, phone, role, profile_photo, is_active, created_at)
    VALUES (:full_name, :email, :password, :phone, :role, NULL, 1, NOW())
  ");

  $ins->execute([
    ":full_name" => $fullName,
    ":email" => $email,
    ":password" => $hashed,
    ":phone" => (string)($data["phone"] ?? ""),
    ":role" => $role,
  ]);
  
  $userId = $pdo->lastInsertId();
  error_log("SUCCESS: User created with ID: $userId");
  
  json_response(201, [
    "status" => "success",
    "success" => true,
    "message" => "Account created successfully! Redirecting to login...",
    "userId" => (int)$userId
  ]);
} catch (Exception $e) {
  error_log("Database error: " . $e->getMessage());
  json_response(500, ["status" => "error", "message" => "Database error. Please try again."]);
}
