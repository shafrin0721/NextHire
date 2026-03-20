const API_BASE_URL = '/NextHire/api';

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

  private async postAction(payload: Record<string, unknown>) {
    const response = await fetch(`${API_BASE_URL}/chatbot.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    let data: any = null;
    try {
      data = await response.json();
    } catch {
      throw new Error('Chatbot server returned an invalid response');
    }

    if (!response.ok) {
      throw new Error(data?.message || `Chatbot request failed (${response.status})`);
    }

    return data;
  }

  // Start a new conversation
  async startConversation(): Promise<ChatSession> {
    const data = await this.postAction({
      action: 'start_conversation',
    });

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

    let data: any;
    try {
      data = await this.postAction({
        action: 'send_message',
        session_id: this.sessionId,
        message,
      });
    } catch (error) {
      // Recover automatically if a stale session ID points to a deleted conversation.
      const messageText = error instanceof Error ? error.message : String(error);
      if (messageText.toLowerCase().includes('conversation not found')) {
        this.resetConversation();
        await this.startConversation();
        data = await this.postAction({
          action: 'send_message',
          session_id: this.sessionId,
          message,
        });
      } else {
        throw error;
      }
    }

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

    let data: any;
    try {
      data = await this.postAction({
        action: 'get_conversation',
        session_id: this.sessionId,
      });
    } catch (error) {
      const messageText = error instanceof Error ? error.message : String(error);
      if (messageText.toLowerCase().includes('conversation not found')) {
        this.resetConversation();
        return [];
      }
      throw error;
    }

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
