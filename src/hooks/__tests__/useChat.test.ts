import { renderHook, act } from '@testing-library/react';
import { useChat } from '../useChat';
import { chatService } from '@/services';

// Mock services
jest.mock('@/services', () => ({
  chatService: {
    sendMessage: jest.fn()
  }
}));

describe('useChat hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock implementation for sendMessage
    (chatService.sendMessage as jest.Mock).mockResolvedValue({
      data: {
        message: {
          id: 'test-response-id',
          text: 'Test bot response',
          isUser: false,
          timestamp: new Date().toISOString()
        },
        conversationId: 'test-conversation-id'
      }
    });
  });

  it('should initialize with welcome UI and initial message', () => {
    const { result } = renderHook(() => useChat());
    
    // Check initial state
    expect(result.current.showWelcomeUi).toBe(true);
    expect(result.current.messages.length).toBe(1);
    expect(result.current.messages[0].isUser).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.conversationId).toBeNull();
  });

  it('should send message and update state correctly', async () => {
    const { result } = renderHook(() => useChat());
    
    // Send a message
    await act(async () => {
      await result.current.sendMessage('Hello, world!');
    });
    
    // Check that message was sent to API
    expect(chatService.sendMessage).toHaveBeenCalledWith({
      message: 'Hello, world!',
      conversationId: undefined
    });
    
    // Check state updates
    expect(result.current.showWelcomeUi).toBe(false);
    expect(result.current.messages.length).toBe(2);
    expect(result.current.messages[0].isUser).toBe(true);
    expect(result.current.messages[0].text).toBe('Hello, world!');
    expect(result.current.messages[1].isUser).toBe(false);
    expect(result.current.conversationId).toBe('test-conversation-id');
  });

  it('should reset conversation', async () => {
    const { result } = renderHook(() => useChat());
    
    // Send a message first
    await act(async () => {
      await result.current.sendMessage('Hello, world!');
    });
    
    // Then reset conversation
    act(() => {
      result.current.resetConversation();
    });
    
    // Check state resets
    expect(result.current.showWelcomeUi).toBe(true);
    expect(result.current.messages.length).toBe(1);
    expect(result.current.messages[0].isUser).toBe(false);
    expect(result.current.conversationId).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should handle API error', async () => {
    // Mock API error
    (chatService.sendMessage as jest.Mock).mockRejectedValue(new Error('API error'));
    
    const { result } = renderHook(() => useChat());
    
    // Send a message
    await act(async () => {
      await result.current.sendMessage('Hello, world!');
    });
    
    // Check error is set
    expect(result.current.error).toBe('خطا در ارسال پیام. لطفا دوباره تلاش کنید.');
    expect(result.current.isLoading).toBe(false);
  });
}); 