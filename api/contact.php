<?php
declare(strict_types=1);

require __DIR__ . "/config/cors.php";
require __DIR__ . "/config/db.php";
require __DIR__ . "/utils/response.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  json_response(405, ["status" => "error", "message" => "Method not allowed"]);
}

$data = get_json_input();

$name    = trim((string)($data["name"] ?? ""));
$email   = trim((string)($data["email"] ?? ""));
$subject = trim((string)($data["subject"] ?? ""));
$message = trim((string)($data["message"] ?? ""));

// Validation
if ($name === "") {
  json_response(422, ["status" => "error", "message" => "Name is required"]);
}

if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(422, ["status" => "error", "message" => "Valid email is required"]);
}

if ($subject === "") {
  json_response(422, ["status" => "error", "message" => "Subject is required"]);
}

if ($message === "") {
  json_response(422, ["status" => "error", "message" => "Message is required"]);
}

if (strlen($message) < 10) {
  json_response(422, ["status" => "error", "message" => "Message must be at least 10 characters"]);
}

// Insert contact message
try {
  $stmt = $pdo->prepare("
    INSERT INTO contact_messages (name, email, subject, message, submitted_at)
    VALUES (:name, :email, :subject, :message, NOW())
  ");

  $stmt->execute([
    ":name" => $name,
    ":email" => $email,
    ":subject" => $subject,
    ":message" => $message,
  ]);

  $messageId = $pdo->lastInsertId();

  json_response(200, [
    "status" => "success",
    "success" => true,
    "message" => "Thank you for contacting us! We'll get back to you within 24 hours.",
    "messageId" => (int)$messageId
  ]);
} catch (Exception $e) {
  error_log("Contact form error: " . $e->getMessage());
  json_response(500, ["status" => "error", "message" => "Failed to send message. Please try again."]);
}
