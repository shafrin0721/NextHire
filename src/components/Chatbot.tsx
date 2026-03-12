import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, RotateCcw, Minimize2, Maximize2 } from 'lucide-react';
import { chatbotService, ChatMessage } from '../services/chatbotService';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Load conversation when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeConversation();
    }
  }, [isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const initializeConversation = async () => {
    try {
      setIsLoading(true);
      
      // Try to load existing conversation
      const existingMessages = await chatbotService.getConversation();
      
      if (existingMessages.length > 0) {
        setMessages(existingMessages);
      } else {
        // Start new conversation
        const session = await chatbotService.startConversation();
        const initialMessages = await chatbotService.getConversation();
        setMessages(initialMessages);
      }
    } catch (error) {
      console.error('Failed to initialize chatbot:', error);
      // Show error message
      setMessages([{
        sender_type: 'bot',
        message_text: 'Sorry, I\'m having trouble connecting. Please try again later.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      sender_type: 'user',
      message_text: inputMessage.trim(),
    };

    // Add user message to UI
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Send to bot
      const botResponse = await chatbotService.sendMessage(userMessage.message_text);
      
      // Simulate typing delay
      setTimeout(() => {
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, {
        sender_type: 'bot',
        message_text: 'Sorry, I encountered an error. Please try again.',
      }]);
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to start a new conversation?')) {
      chatbotService.resetConversation();
      setMessages([]);
      await initializeConversation();
    }
  };

  const handleQuickAction = async (action: string) => {
    setInputMessage(action);
    // Auto-send
    setTimeout(() => {
      const form = document.getElementById('chatbot-form') as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    }, 100);
  };

  const quickActions = [
    'Show me available jobs',
    'How do I apply?',
    'Check application status',
    'Contact support',
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 z-50 animate-bounce"
        aria-label="Open chatbot"
      >
        <MessageCircle size={28} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          AI
        </span>
      </button>
    );
  }

  return (
    <Card 
      className={`fixed ${isMinimized ? 'bottom-6 right-6 w-80' : 'bottom-6 right-6 w-96'} ${
        isMinimized ? 'h-16' : 'h-[600px]'
      } flex flex-col shadow-2xl z-50 bg-white transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <MessageCircle size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">NextHire Assistant</h3>
            <p className="text-xs text-white/80">AI-powered help</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/20 p-1.5 rounded transition-colors"
            aria-label={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={handleReset}
            className="hover:bg-white/20 p-1.5 rounded transition-colors"
            aria-label="Reset conversation"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1.5 rounded transition-colors"
            aria-label="Close chatbot"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {isLoading && messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                        message.sender_type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">
                        {message.message_text}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 shadow-sm border border-gray-100 rounded-2xl px-4 py-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Quick Actions */}
          {messages.length > 0 && !isLoading && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form
            id="chatbot-form"
            onSubmit={handleSendMessage}
            className="p-4 border-t bg-white rounded-b-lg"
          >
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send size={18} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by NextHire AI 🤖
            </p>
          </form>
        </>
      )}
    </Card>
  );
};
