import { BaseApiService } from './baseService';
import { ApiResponse, ChatCompletionResponse, Message } from './types';

interface SendMessageParams {
  message: string;
  conversationId?: string;
}

/**
 * Service for chat-related API operations
 */
export class ChatService extends BaseApiService {
  constructor() {
    super('/api/chat');
  }

  /**
   * Send a message to the chat API
   */
  async sendMessage(params: SendMessageParams): Promise<ApiResponse<ChatCompletionResponse>> {
    return this.post<ChatCompletionResponse>('/send', params);
  }

  /**
   * Get conversation history
   */
  async getConversationHistory(conversationId: string): Promise<ApiResponse<Message[]>> {
    return this.get<Message[]>(`/history/${conversationId}`);
  }

  /**
   * Create a new conversation
   */
  async createConversation(): Promise<ApiResponse<{ conversationId: string }>> {
    return this.post<{ conversationId: string }>('/create');
  }

  /**
   * Delete a conversation
   */
  async deleteConversation(conversationId: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/${conversationId}`);
  }
} 