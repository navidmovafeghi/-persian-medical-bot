import { render, screen, fireEvent } from '@testing-library/react';
import { ChatInput } from '../ChatInput';

describe('ChatInput Component', () => {
  const mockSubmit = jest.fn();
  const mockReset = jest.fn();
  
  beforeEach(() => {
    // Reset mocks before each test
    mockSubmit.mockReset();
    mockReset.mockReset();
  });
  
  it('renders the input field and buttons', () => {
    render(
      <ChatInput 
        onSubmit={mockSubmit} 
        onReset={mockReset}
        isLoading={false}
      />
    );
    
    // Check that the input field exists
    expect(screen.getByPlaceholderText('پیام خود را اینجا بنویسید...')).toBeInTheDocument();
    
    // Check that the send button exists
    const sendButton = screen.getByRole('button', { name: /ارسال پیام/i });
    expect(sendButton).toBeInTheDocument();
    
    // Check that the reset button exists
    const resetButton = screen.getByRole('button', { name: /شروع مکالمه جدید/i });
    expect(resetButton).toBeInTheDocument();
  });
  
  it('calls onSubmit when a message is submitted', () => {
    render(
      <ChatInput 
        onSubmit={mockSubmit} 
        onReset={mockReset}
        isLoading={false}
      />
    );
    
    // Type a message in the input field
    const inputField = screen.getByPlaceholderText('پیام خود را اینجا بنویسید...');
    fireEvent.change(inputField, { target: { value: 'Hello, world!' } });
    
    // Submit the form
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    
    // Check that onSubmit was called with the correct message
    expect(mockSubmit).toHaveBeenCalledWith('Hello, world!');
    
    // Check that the input field was cleared
    expect(inputField).toHaveValue('');
  });
  
  it('does not call onSubmit when the input is empty', () => {
    render(
      <ChatInput 
        onSubmit={mockSubmit} 
        onReset={mockReset}
        isLoading={false}
      />
    );
    
    // Submit the form with an empty input
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    
    // Check that onSubmit was not called
    expect(mockSubmit).not.toHaveBeenCalled();
  });
  
  it('disables the input and send button when isLoading is true', () => {
    render(
      <ChatInput 
        onSubmit={mockSubmit} 
        onReset={mockReset}
        isLoading={true}
      />
    );
    
    // Check that the input field is disabled
    const inputField = screen.getByPlaceholderText('پیام خود را اینجا بنویسید...');
    expect(inputField).toBeDisabled();
    
    // Check that the send button is disabled
    const sendButton = screen.getByRole('button', { name: /ارسال پیام/i });
    expect(sendButton).toBeDisabled();
  });
  
  it('calls onReset when the reset button is clicked', () => {
    render(
      <ChatInput 
        onSubmit={mockSubmit} 
        onReset={mockReset}
        isLoading={false}
      />
    );
    
    // Click the reset button
    const resetButton = screen.getByRole('button', { name: /شروع مکالمه جدید/i });
    fireEvent.click(resetButton);
    
    // Check that onReset was called
    expect(mockReset).toHaveBeenCalled();
  });
}); 