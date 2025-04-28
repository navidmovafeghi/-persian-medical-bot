/**
 * Common application types used throughout the project
 */

/**
 * User profile type
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
}

/**
 * User preferences
 */
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'fa' | 'en';
  notifications: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

/**
 * Health record type
 */
export interface HealthRecord {
  id: string;
  userId: string;
  date: string;
  type: 'blood-pressure' | 'glucose' | 'weight' | 'medication' | 'exercise' | 'sleep';
  value: number | string;
  unit?: string;
  notes?: string;
}

/**
 * Medication type
 */
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate?: string;
  endDate?: string;
  notes?: string;
}

/**
 * Food diary entry
 */
export interface FoodDiaryEntry {
  id: string;
  userId: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: FoodItem[];
  notes?: string;
}

/**
 * Food item
 */
export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  quantity: number;
  unit: string;
}

/**
 * Chat conversation
 */
export interface Conversation {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
} 