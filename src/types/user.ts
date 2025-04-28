/**
 * User-related type definitions
 */

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  PATIENT = 'patient',
  GUEST = 'guest'
}

export interface UserPreferences {
  language: 'fa' | 'en';
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
  };
}

export interface PatientProfile extends UserProfile {
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  height?: number; // in cm
  weight?: number; // in kg
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  allergies?: string[];
  chronicConditions?: string[];
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface DoctorProfile extends UserProfile {
  specialization: string;
  licenseNumber: string;
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  yearsOfExperience: number;
  languages: string[];
  availability?: {
    days: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
    hours: {
      start: string; // HH:MM format
      end: string; // HH:MM format
    };
  };
} 