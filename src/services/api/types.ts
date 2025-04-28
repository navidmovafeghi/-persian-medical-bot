/**
 * Common API response type
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Error response from API
 */
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Message type for chat
 */
export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  code?: {
    html?: string;
    css?: string;
    js?: string;
  };
}

/**
 * Response from chat completion API
 */
export interface ChatCompletionResponse {
  message: Message;
  suggestions?: string[];
} 