<?php
declare(strict_types=1);

require __DIR__ . "/config/cors.php";
require __DIR__ . "/config/db.php";
require __DIR__ . "/utils/response.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  json_response(405, ["status" => "error", "message" => "Method not allowed"]);
}

$data = get_json_input();

$fullName = trim((string)($data["fullName"] ?? ""));
$email    = trim((string)($data["email"] ?? ""));
$password = (string)($data["password"] ?? "");

if ($fullName === "") {
  json_response(422, ["status" => "error", "message" => "Full name is required"]);
}
if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(422, ["status" => "error", "message" => "Valid email is required"]);
}
if ($password === "" || strlen($password) < 6) {
  json_response(422, ["status" => "error", "message" => "Password must be at least 6 characters"]);
}

// email exists
$stmt = $pdo->prepare("SELECT user_id FROM users WHERE email = :email LIMIT 1");
$stmt->execute([":email" => $email]);
if ($stmt->fetch()) {
  json_response(409, ["status" => "error", "message" => "Email already registered"]);
}

// hash password
$hashed = password_hash($password, PASSWORD_BCRYPT);

// insert
$ins = $pdo->prepare("
  INSERT INTO users (full_name, email, password, phone, role, profile_photo, is_active)
  VALUES (:full_name, :email, :password, NULL, 'candidate', NULL, 1)
");

$ins->execute([
  ":full_name" => $fullName,
  ":email" => $email,
  ":password" => $hashed,
]);

json_response(201, [
  "status" => "success",
  "success" => true,
  "message" => "Account created successfully! Redirecting to login..."
]);
