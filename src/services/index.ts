export * from './api/types';
export * from './api/baseService';
export * from './api/chatService';

// Singleton instances
import { ChatService } from './api/chatService';

export const chatService = new ChatService(); 