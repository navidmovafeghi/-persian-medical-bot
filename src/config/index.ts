/**
 * Application configuration constants
 * Centralized location for all configuration values and constants
 */

const getEnvVar = (key: string, defaultValue: string): string => {
  const value = process.env[key];
  return value !== undefined ? value : defaultValue;
};

const getEnvBool = (key: string, defaultValue: boolean): boolean => {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true';
};

export const config = {
  // API endpoints
  api: {
    baseUrl: getEnvVar('NEXT_PUBLIC_API_URL', 'http://localhost:3000/api'),
  },
  
  // Feature flags
  features: {
    enableHealthTracker: getEnvBool('NEXT_PUBLIC_ENABLE_HEALTH_TRACKER', true),
    enableFoodDiary: getEnvBool('NEXT_PUBLIC_ENABLE_FOOD_DIARY', true),
  },
  
  // UI configuration
  ui: {
    sidebarWidth: 280, // in pixels
    mobileBreakpoint: 768, // in pixels
  },
  
  // Localization
  locale: {
    defaultLocale: 'fa', // Persian
    fallbackLocale: 'en',
  },
  
  // Authentication
  auth: {
    domain: getEnvVar('NEXT_PUBLIC_AUTH_DOMAIN', ''),
    clientId: getEnvVar('NEXT_PUBLIC_AUTH_CLIENT_ID', ''),
    audience: getEnvVar('NEXT_PUBLIC_AUTH_AUDIENCE', ''),
  },
  
  // Analytics
  analytics: {
    id: getEnvVar('NEXT_PUBLIC_ANALYTICS_ID', ''),
  },
}; 