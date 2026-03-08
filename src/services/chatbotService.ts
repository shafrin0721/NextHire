const API_BASE_URL = 'http://localhost/NextHire/api';

export interface ChatMessage {
  message_id?: number;
  sender_type: 'user' | 'bot';
  message_text: string;
  created_at?: string;
  intent?: string;
}

export interface ChatSession {
  session_id: string;
  conversation_id: number;
}

class ChatbotService {
  private sessionId: string | null = null;

  // Start a new conversation
  async startConversation(): Promise<ChatSession> {
    const response = await fetch(`${API_BASE_URL}/chatbot.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'start_conversation',
      }),
    });

    const data = await response.json();
    if (data.status === 'success') {
      this.sessionId = data.session_id;
      localStorage.setItem('chatbot_session_id', data.session_id);
      
      return {
        session_id: data.session_id,
        conversation_id: data.conversation_id,
      };
    }
    throw new Error(data.message || 'Failed to start conversation');
  }

  // Send a message to the bot
  async sendMessage(message: string): Promise<ChatMessage> {
    if (!this.sessionId) {
      this.sessionId = localStorage.getItem('chatbot_session_id');
      if (!this.sessionId) {
        await this.startConversation();
      }
    }

    const response = await fetch(`${API_BASE_URL}/chatbot.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'send_message',
        session_id: this.sessionId,
        message: message,
      }),
    });

    const data = await response.json();
    if (data.status === 'success') {
      return {
        sender_type: 'bot',
        message_text: data.bot_message,
        intent: data.intent,
      };
    }
    throw new Error(data.message || 'Failed to send message');
  }

  // Get conversation history
  async getConversation(): Promise<ChatMessage[]> {
    if (!this.sessionId) {
      this.sessionId = localStorage.getItem('chatbot_session_id');
      if (!this.sessionId) {
        return [];
      }
    }

    const response = await fetch(`${API_BASE_URL}/chatbot.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'get_conversation',
        session_id: this.sessionId,
      }),
    });

    const data = await response.json();
    if (data.status === 'success') {
      return data.messages;
    }
    return [];
  }

  // Reset conversation
  resetConversation(): void {
    this.sessionId = null;
    localStorage.removeItem('chatbot_session_id');
  }
}

export const chatbotService = new ChatbotService();
