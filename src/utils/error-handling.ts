/**
 * Utilities for consistent error handling
 */

/**
 * Custom application error with additional context
 */
export class AppError extends Error {
  public statusCode?: number;
  public context?: Record<string, unknown>;

  constructor(message: string, statusCode?: number, context?: Record<string, unknown>) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.context = context;
    
    // Maintain proper stack trace in Node.js
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

/**
 * Safely executes an async function and returns a tuple with [data, error]
 * Similar to Go's error handling pattern
 */
export async function safeAsync<T>(
  asyncFn: () => Promise<T>,
): Promise<[T | null, Error | null]> {
  try {
    const data = await asyncFn();
    return [data, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}

/**
 * Format error messages for display
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return String(error);
}

/**
 * Map HTTP errors to user-friendly messages
 */
export function getUserFriendlyErrorMessage(statusCode: number): string {
  switch (statusCode) {
    case 400:
      return 'درخواست نامعتبر است. لطفاً اطلاعات خود را بررسی کنید.';
    case 401:
      return 'دسترسی غیرمجاز. لطفاً دوباره وارد شوید.';
    case 403:
      return 'شما مجوز دسترسی به این منبع را ندارید.';
    case 404:
      return 'منبع درخواستی یافت نشد.';
    case 429:
      return 'تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً کمی صبر کنید و دوباره تلاش کنید.';
    case 500:
      return 'خطای داخلی سرور. لطفاً بعداً دوباره تلاش کنید.';
    default:
      return 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.';
  }
} 