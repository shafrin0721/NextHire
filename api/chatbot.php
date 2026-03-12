<?php
declare(strict_types=1);

require __DIR__ . "/config/cors.php";
require __DIR__ . "/config/db.php";
require __DIR__ . "/utils/response.php";

header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "POST") {
    $data = get_json_input();
    $action = (string)($data['action'] ?? '');
    
    switch ($action) {
        case 'send_message':
            handleSendMessage($pdo, $data);
            break;
        case 'get_conversation':
            getConversation($pdo, $data);
            break;
        case 'start_conversation':
            startConversation($pdo);
            break;
        default:
            json_response(400, ["status" => "error", "message" => "Invalid action"]);
    }
} else {
    json_response(405, ["status" => "error", "message" => "Method not allowed"]);
}

// Start new conversation
function startConversation($pdo) {
    $sessionId = uniqid('chat_', true);
    
    try {
        $stmt = $pdo->prepare("
            INSERT INTO chatbot_conversations (session_id, started_at) 
            VALUES (:session_id, NOW())
        ");
        $stmt->execute([':session_id' => $sessionId]);
        
        $conversationId = (int)$pdo->lastInsertId();
        
        // Send welcome message
        $welcomeMsg = "Hello! 👋 I'm NextHire Assistant. I can help you with:\n\n" .
                     "• Job openings and applications\n" .
                     "• Interview scheduling\n" .
                     "• Account management\n" .
                     "• FAQs and support\n\n" .
                     "What would you like to know?";
        
        $stmt = $pdo->prepare("
            INSERT INTO chatbot_messages (conversation_id, sender_type, message_text, created_at) 
            VALUES (:conv_id, 'bot', :message, NOW())
        ");
        $stmt->execute([
            ':conv_id' => $conversationId,
            ':message' => $welcomeMsg
        ]);
        
        json_response(200, [
            "status" => "success",
            "session_id" => $sessionId,
            "conversation_id" => $conversationId,
            "message" => $welcomeMsg
        ]);
    } catch (Exception $e) {
        error_log("Chatbot error: " . $e->getMessage());
        json_response(500, ["status" => "error", "message" => "Failed to start conversation"]);
    }
}

// Get conversation history
function getConversation($pdo, $data) {
    $sessionId = (string)($data['session_id'] ?? '');
    
    if (empty($sessionId)) {
        json_response(422, ["status" => "error", "message" => "Session ID required"]);
    }
    
    try {
        $stmt = $pdo->prepare("
            SELECT conversation_id FROM chatbot_conversations 
            WHERE session_id = :session_id 
            LIMIT 1
        ");
        $stmt->execute([':session_id' => $sessionId]);
        $conversation = $stmt->fetch();
        
        if (!$conversation) {
            json_response(404, ["status" => "error", "message" => "Conversation not found"]);
        }
        
        $stmt = $pdo->prepare("
            SELECT message_id, sender_type, message_text, created_at 
            FROM chatbot_messages 
            WHERE conversation_id = :conv_id 
            ORDER BY created_at ASC
        ");
        $stmt->execute([':conv_id' => $conversation['conversation_id']]);
        $messages = $stmt->fetchAll();
        
        json_response(200, [
            "status" => "success",
            "messages" => $messages
        ]);
    } catch (Exception $e) {
        error_log("Chatbot error: " . $e->getMessage());
        json_response(500, ["status" => "error", "message" => "Failed to get conversation"]);
    }
}

// Send message and get bot response
function handleSendMessage($pdo, $data) {
    $sessionId = (string)($data['session_id'] ?? '');
    $userMessage = trim((string)($data['message'] ?? ''));
    
    if (empty($sessionId) || empty($userMessage)) {
        json_response(422, ["status" => "error", "message" => "Session ID and message required"]);
    }
    
    try {
        // Get conversation
        $stmt = $pdo->prepare("
            SELECT conversation_id FROM chatbot_conversations 
            WHERE session_id = :session_id 
            LIMIT 1
        ");
        $stmt->execute([':session_id' => $sessionId]);
        $conversation = $stmt->fetch();
        
        if (!$conversation) {
            json_response(404, ["status" => "error", "message" => "Conversation not found"]);
        }
        
        $conversationId = (int)$conversation['conversation_id'];
        
        // Save user message
        $stmt = $pdo->prepare("
            INSERT INTO chatbot_messages (conversation_id, sender_type, message_text, created_at) 
            VALUES (:conv_id, 'user', :message, NOW())
        ");
        $stmt->execute([
            ':conv_id' => $conversationId,
            ':message' => $userMessage
        ]);
        
        // Get bot response
        $botResponse = getBotResponse($pdo, $userMessage, $conversationId);
        
        // Save bot response
        $stmt = $pdo->prepare("
            INSERT INTO chatbot_messages (conversation_id, sender_type, message_text, intent, created_at) 
            VALUES (:conv_id, 'bot', :message, :intent, NOW())
        ");
        $stmt->execute([
            ':conv_id' => $conversationId,
            ':message' => $botResponse['answer'],
            ':intent' => $botResponse['intent']
        ]);
        
        json_response(200, [
            "status" => "success",
            "user_message" => $userMessage,
            "bot_message" => $botResponse['answer'],
            "intent" => $botResponse['intent']
        ]);
    } catch (Exception $e) {
        error_log("Chatbot error: " . $e->getMessage());
        json_response(500, ["status" => "error", "message" => "Failed to process message"]);
    }
}

// Generate bot response using knowledge base
function getBotResponse($pdo, $userMessage, $conversationId) {
    $userMessage = strtolower($userMessage);
    
    // Special handling for job queries
    if (preg_match('/\b(how many|total|number of|count).*(job|position|opening)/i', $userMessage)) {
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM jobs WHERE status = 'active'");
        $result = $stmt->fetch();
        $count = (int)$result['count'];
        
        if ($count > 0) {
            return [
                'intent' => 'job_count',
                'answer' => "We currently have {$count} active job opening" . ($count > 1 ? 's' : '') . "! 🎯\n\n" .
                           "You can browse all positions on our Jobs page. Would you like to know about specific categories or locations?"
            ];
        } else {
            return [
                'intent' => 'job_count',
                'answer' => "We don't have any active job openings at the moment, but we're always looking for great talent! " .
                           "Please check back soon or submit your resume for future opportunities."
            ];
        }
    }
    
    // Search knowledge base
    $stmt = $pdo->query("
        SELECT * FROM chatbot_knowledge 
        WHERE is_active = 1 
        ORDER BY priority DESC
    ");
    $knowledgeBase = $stmt->fetchAll();
    
    $bestMatch = null;
    $highestScore = 0;
    
    foreach ($knowledgeBase as $knowledge) {
        $keywords = explode(',', strtolower($knowledge['keywords']));
        $score = 0;
        
        foreach ($keywords as $keyword) {
            $keyword = trim($keyword);
            if (strpos($userMessage, $keyword) !== false) {
                $score += strlen($keyword); // Longer keyword matches get higher scores
            }
        }
        
        if ($score > $highestScore) {
            $highestScore = $score;
            $bestMatch = $knowledge;
        }
    }
    
    if ($bestMatch && $highestScore > 0) {
        return [
            'intent' => $bestMatch['category'],
            'answer' => $bestMatch['answer']
        ];
    }
    
    // No match found - provide default response
    return [
        'intent' => 'unknown',
        'answer' => "I'm not sure I understand that question. 🤔\n\n" .
                   "I can help you with:\n" .
                   "• Job openings and applications\n" .
                   "• Interview scheduling\n" .
                   "• Application status\n" .
                   "• Account management\n" .
                   "• Contact information\n\n" .
                   "Could you rephrase your question or choose one of these topics?"
    ];
}
?>
