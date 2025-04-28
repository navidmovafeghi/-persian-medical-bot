/**
 * API-related type definitions
 */

import { UserProfile } from './user';

// General API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Error response
export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: UserProfile;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Medical consultation types
export interface ConsultationRequest {
  symptoms: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  medicalHistory?: string;
}

export interface ConsultationResponse {
  diagnosis: string;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high' | 'emergency';
  followUpNeeded: boolean;
} 