import { 
  AppError, 
  safeAsync, 
  formatErrorMessage, 
  getUserFriendlyErrorMessage 
} from './error-handling';

describe('AppError', () => {
  test('should create an error with the correct message', () => {
    const error = new AppError('Test error');
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('AppError');
  });

  test('should include status code and context when provided', () => {
    const context = { id: '123', action: 'update' };
    const error = new AppError('API error', 404, context);
    
    expect(error.message).toBe('API error');
    expect(error.statusCode).toBe(404);
    expect(error.context).toEqual(context);
  });
});

describe('safeAsync', () => {
  test('should return data and null error for successful async function', async () => {
    const asyncFn = async () => 'success';
    const [data, error] = await safeAsync(asyncFn);
    
    expect(data).toBe('success');
    expect(error).toBeNull();
  });

  test('should return null data and error for failed async function', async () => {
    const testError = new Error('Test error');
    const asyncFn = async () => { throw testError; };
    
    const [data, error] = await safeAsync(asyncFn);
    
    expect(data).toBeNull();
    expect(error).toBe(testError);
  });

  test('should convert non-Error thrown values to Error objects', async () => {
    const asyncFn = async () => { throw 'string error'; };
    
    const [data, error] = await safeAsync(asyncFn);
    
    expect(data).toBeNull();
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('string error');
  });
});

describe('formatErrorMessage', () => {
  test('should return message from AppError', () => {
    const error = new AppError('App error message', 500);
    const message = formatErrorMessage(error);
    
    expect(message).toBe('App error message');
  });

  test('should return message from Error', () => {
    const error = new Error('Standard error message');
    const message = formatErrorMessage(error);
    
    expect(message).toBe('Standard error message');
  });

  test('should convert non-Error values to string', () => {
    expect(formatErrorMessage('Error string')).toBe('Error string');
    expect(formatErrorMessage(123)).toBe('123');
    expect(formatErrorMessage(null)).toBe('null');
    expect(formatErrorMessage(undefined)).toBe('undefined');
  });
});

describe('getUserFriendlyErrorMessage', () => {
  test('should return appropriate message for status code 400', () => {
    expect(getUserFriendlyErrorMessage(400)).toContain('درخواست نامعتبر');
  });

  test('should return appropriate message for status code 401', () => {
    expect(getUserFriendlyErrorMessage(401)).toContain('دسترسی غیرمجاز');
  });

  test('should return appropriate message for status code 404', () => {
    expect(getUserFriendlyErrorMessage(404)).toContain('یافت نشد');
  });

  test('should return appropriate message for status code 500', () => {
    expect(getUserFriendlyErrorMessage(500)).toContain('خطای داخلی سرور');
  });

  test('should return a default message for unknown status codes', () => {
    expect(getUserFriendlyErrorMessage(599)).toContain('خطایی رخ داده است');
  });
}); 