<?php
declare(strict_types=1);

require __DIR__ . "/config/cors.php";
require __DIR__ . "/config/db.php";
require __DIR__ . "/utils/response.php";

session_start();

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  json_response(405, ["status" => "error", "message" => "Method not allowed"]);
}

$data = get_json_input();

$email    = trim((string)($data["email"] ?? ""));
$password = (string)($data["password"] ?? "");

if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(422, ["status" => "error", "message" => "Valid email is required"]);
}
if ($password === "") {
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

if (!$user) {
  json_response(401, ["status" => "error", "message" => "Invalid email or password"]);
}

if ((int)$user["is_active"] !== 1) {
  json_response(403, ["status" => "error", "message" => "Account is disabled"]);
}

// verify
if (!password_verify($password, (string)$user["password"])) {
  json_response(401, ["status" => "error", "message" => "Invalid email or password"]);
}

// session
$_SESSION["user_id"] = (int)$user["user_id"];
$_SESSION["role"] = (string)$user["role"];

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
