<?php
declare(strict_types=1);

require __DIR__ . "/config/cors.php";
require __DIR__ . "/config/db.php";
require __DIR__ . "/utils/response.php";

session_start();

// Enable error logging for debugging
error_log("=== LOGIN REQUEST START ===");
error_log("Request method: " . $_SERVER["REQUEST_METHOD"]);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  json_response(405, ["status" => "error", "message" => "Method not allowed"]);
}

$data = get_json_input();
error_log("Login data: " . json_encode($data));

$email    = trim((string)($data["email"] ?? ""));
$password = (string)($data["password"] ?? "");

error_log("Login attempt for email: $email");

if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  error_log("Error: Invalid email format");
  json_response(422, ["status" => "error", "message" => "Valid email is required"]);
}
if ($password === "") {
  error_log("Error: Password is empty");
  json_response(422, ["status" => "error", "message" => "Password is required"]);
}

// find user
$stmt = $pdo->prepare("
  SELECT user_id, full_name, email, password, role, is_active
  FROM users
  WHERE email = :email
  LIMIT 1
");
$stmt->execute([":email" => $email]);
$user = $stmt->fetch();

error_log("User lookup result: " . ($user ? "Found user with role: " . $user['role'] : "User not found"));

if (!$user) {
  error_log("Error: User not found in database");
  json_response(401, ["status" => "error", "message" => "Invalid email or password"]);
}

if ((int)$user["is_active"] !== 1) {
  error_log("Error: Account is disabled for user: " . $user['email']);
  json_response(403, ["status" => "error", "message" => "Account is disabled"]);
}

// verify
error_log("Verifying password for user: " . $user['email']);
if (!password_verify($password, (string)$user["password"])) {
  error_log("Error: Password verification failed for user: " . $user['email']);
  json_response(401, ["status" => "error", "message" => "Invalid email or password"]);
}

error_log("Password verified successfully");

// session
$_SESSION["user_id"] = (int)$user["user_id"];
$_SESSION["role"] = (string)$user["role"];

error_log("Login successful for user: " . $user['email'] . " with role: " . $user['role']);

json_response(200, [
  "status" => "success",
  "success" => true,
  "message" => "Login successful",
  "user" => [
    "id" => (int)$user["user_id"],
    "fullName" => (string)$user["full_name"],
    "email" => (string)$user["email"],
    "role" => (string)$user["role"],
  ]
]);
