import { useState, useCallback } from 'react';
import { safeAsync, formatErrorMessage, AppError } from '@/utils/error-handling';
import { config } from '@/config';

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiOptions {
  method?: ApiMethod;
  headers?: Record<string, string>;
  body?: Record<string, unknown> | FormData;
  requiresAuth?: boolean;
}

interface UseApiResult<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  execute: (path: string, options?: ApiOptions) => Promise<void>;
}

/**
 * Custom hook for making API requests with consistent error handling
 */
export function useApi<T = unknown>(): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(async (path: string, options: ApiOptions = {}) => {
    setIsLoading(true);
    setError(null);

    const {
      method = 'GET',
      headers = {},
      body,
      requiresAuth = false,
    } = options;

    const requestUrl = path.startsWith('http') ? path : `${config.api.baseUrl}${path}`;
    
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (requiresAuth) {
      // Add authentication header if needed
      // requestHeaders['Authorization'] = `Bearer ${getToken()}`;
    }

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body) {
      if (body instanceof FormData) {
        // Remove Content-Type header so browser can set it with boundary
        delete requestHeaders['Content-Type'];
        requestOptions.body = body;
      } else {
        requestOptions.body = JSON.stringify(body);
      }
    }

    const [response, fetchError] = await safeAsync<Response>(() => 
      fetch(requestUrl, requestOptions)
    );

    if (fetchError) {
      setError(formatErrorMessage(fetchError));
      setIsLoading(false);
      return;
    }

    if (!response) {
      setError('ارتباط با سرور برقرار نشد.');
      setIsLoading(false);
      return;
    }

    if (!response.ok) {
      let errorMessage = `خطای ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // If parsing JSON fails, keep the default error message
      }
      
      setError(errorMessage);
      setIsLoading(false);
      return;
    }

    try {
      // For empty responses or non-JSON responses (like file downloads)
      if (response.headers.get('Content-Type')?.includes('application/json')) {
        const [jsonData, jsonError] = await safeAsync<T>(() => response.json());
        
        if (jsonError) {
          throw new AppError('خطا در پردازش پاسخ سرور', response.status);
        }
        
        setData(jsonData);
      } else {
        // Handle non-JSON responses if needed
        setData(null);
      }
    } catch (parseError) {
      setError(formatErrorMessage(parseError));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, isLoading, execute };
} 