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

  // Send email notification to hello@nexthire.lk
  $to = "hello@nexthire.lk";
  $headers = "From: " . $email . "\r\n";
  $headers .= "Reply-To: " . $email . "\r\n";
  $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
  $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

  $emailBody = "New message from NextHire Contact Form\n\n";
  $emailBody .= "Full Name: " . $name . "\n";
  $emailBody .= "Email Address: " . $email . "\n";
  $emailBody .= "Subject: " . $subject . "\n\n";
  $emailBody .= "Message:\n" . $message . "\n";

  @mail($to, "NextHire Contact: " . $subject, $emailBody, $headers);

  json_response(200, [
    "status" => "success",
    "success" => true,
    "message" => "Your message has been sent successfully. Our team will contact you soon.",
    "messageId" => (int)$messageId
  ]);
} catch (Exception $e) {
  error_log("Contact form error: " . $e->getMessage());
  json_response(500, ["status" => "error", "message" => "Failed to send message. Please try again."]);
}
