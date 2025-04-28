import { ApiError, ApiResponse } from './types';

/**
 * Base configuration for API requests
 */
interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  withCredentials?: boolean;
}

/**
 * Base API service with common fetch methods
 */
export class BaseApiService {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value);
        }
      });
    }
    
    return url.toString();
  }

  /**
   * Handle API response and errors
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    if (!response.ok) {
      let errorData: ApiError;
      
      if (isJson) {
        errorData = await response.json();
      } else {
        errorData = {
          status: response.status,
          message: response.statusText || 'خطای نامشخص رخ داده است.'
        };
      }
      
      throw errorData;
    }
    
    if (isJson) {
      const data = await response.json();
      return {
        data,
        status: response.status,
        message: 'عملیات با موفقیت انجام شد.'
      };
    }
    
    return {
      data: {} as T,
      status: response.status,
      message: 'عملیات با موفقیت انجام شد.'
    };
  }

  /**
   * HTTP GET request
   */
  protected async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const { params, ...requestConfig } = config || {};
    const url = this.buildUrl(endpoint, params);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...requestConfig?.headers
      },
      credentials: config?.withCredentials ? 'include' : 'same-origin',
      ...requestConfig
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * HTTP POST request
   */
  protected async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const { params, ...requestConfig } = config || {};
    const url = this.buildUrl(endpoint, params);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...requestConfig?.headers
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: config?.withCredentials ? 'include' : 'same-origin',
      ...requestConfig
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * HTTP PUT request
   */
  protected async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const { params, ...requestConfig } = config || {};
    const url = this.buildUrl(endpoint, params);
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...requestConfig?.headers
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: config?.withCredentials ? 'include' : 'same-origin',
      ...requestConfig
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * HTTP DELETE request
   */
  protected async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const { params, ...requestConfig } = config || {};
    const url = this.buildUrl(endpoint, params);
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...requestConfig?.headers
      },
      credentials: config?.withCredentials ? 'include' : 'same-origin',
      ...requestConfig
    });
    
    return this.handleResponse<T>(response);
  }
} 