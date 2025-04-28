import React from 'react';
import { render, screen } from '@/utils/test-utils';
import { ErrorMessage } from './error-message';

describe('ErrorMessage', () => {
  test('renders error message with default severity', () => {
    render(<ErrorMessage message="این یک پیام خطا است" />);
    
    // Check if the message is rendered
    expect(screen.getByText('این یک پیام خطا است')).toBeInTheDocument();
    
    // Check if the alert role is set
    expect(screen.getByRole('alert')).toBeInTheDocument();
    
    // Default severity should be 'error'
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass('bg-red-50');
    expect(alertElement).toHaveClass('text-red-700');
  });

  test('renders with warning severity', () => {
    render(<ErrorMessage message="این یک هشدار است" severity="warning" />);
    
    // Check for warning styles
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass('bg-yellow-50');
    expect(alertElement).toHaveClass('text-yellow-700');
  });

  test('renders with info severity', () => {
    render(<ErrorMessage message="این یک اطلاعیه است" severity="info" />);
    
    // Check for info styles
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass('bg-blue-50');
    expect(alertElement).toHaveClass('text-blue-700');
  });

  test('renders with retry button when onRetry is provided', async () => {
    const handleRetry = jest.fn();
    const { user } = render(
      <ErrorMessage message="خطا" onRetry={handleRetry} />
    );
    
    // Find retry button
    const retryButton = screen.getByText('تلاش مجدد');
    expect(retryButton).toBeInTheDocument();
    
    // Click the retry button
    await user.click(retryButton);
    
    // Check if the handler was called
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  test('accepts ReactNode as message', () => {
    render(
      <ErrorMessage 
        message={<span data-testid="custom-message">پیام <strong>مهم</strong></span>} 
      />
    );
    
    // Check if the custom component is rendered
    expect(screen.getByTestId('custom-message')).toBeInTheDocument();
    expect(screen.getByText('مهم')).toBeInTheDocument();
  });

  test('applies additional classes when className is provided', () => {
    render(
      <ErrorMessage 
        message="پیام خطا" 
        className="custom-class extra-padding"
      />
    );
    
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass('custom-class');
    expect(alertElement).toHaveClass('extra-padding');
  });
}); 