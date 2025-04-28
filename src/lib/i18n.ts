type LanguageCode = 'fa' | 'en';

interface TranslationsMap {
  [key: string]: {
    [key in LanguageCode]?: string;
  };
}

// Translations for the application
const translations: TranslationsMap = {
  // Common
  'common.loading': {
    fa: 'در حال بارگذاری...',
    en: 'Loading...',
  },
  'common.error': {
    fa: 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.',
    en: 'An error occurred. Please try again.',
  },
  'common.send': {
    fa: 'ارسال',
    en: 'Send',
  },
  'common.reset': {
    fa: 'شروع مجدد',
    en: 'Reset',
  },
  
  // Chat
  'chat.placeholder': {
    fa: 'پیام خود را اینجا بنویسید...',
    en: 'Type your message here...',
  },
  'chat.welcome.title': {
    fa: 'دستیار هوشمند پزشکی پارسی',
    en: 'Persian Medical Assistant',
  },
  'chat.welcome.subtitle': {
    fa: 'از من هر سؤالی در مورد سلامت، تغذیه، یا مراقبت‌های پزشکی بپرسید',
    en: 'Ask me any question about health, nutrition, or medical care',
  },
  'chat.welcome.greeting': {
    fa: 'سلام! من دستیار هوشمند شما هستم. چطور می‌توانم کمکتان کنم؟',
    en: 'Hello! I\'m your AI assistant. How can I help you today?',
  },
  'chat.quickReplies.title': {
    fa: 'جستجوی سریع',
    en: 'Quick Search',
  },
  'chat.popularTopics.title': {
    fa: 'موضوعات پرطرفدار',
    en: 'Popular Topics',
  },
  
  // Medical Topics
  'topics.ai.health': {
    fa: 'هوش مصنوعی در سلامت',
    en: 'AI in Healthcare',
  },
  'topics.ai.creativity': {
    fa: 'هوش مصنوعی و خلاقیت',
    en: 'AI and Creativity',
  },
  'topics.nutrition': {
    fa: 'تغذیه و سلامت',
    en: 'Nutrition and Health',
  },
};

/**
 * Get a translation by key and language
 */
export function t(key: string, language: LanguageCode = 'fa'): string {
  const translation = translations[key];
  
  if (!translation) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  
  return translation[language] || translation['fa'] || key;
}

/**
 * Hook to get the current language
 * In a real app, this would read from user preferences/browser settings
 */
export function useLanguage(): LanguageCode {
  // This is a simplified version - in a real app, this would be more sophisticated
  return 'fa';
}

/**
 * Translation function with the current language
 */
export function useTranslation() {
  const language = useLanguage();
  
  return {
    t: (key: string) => t(key, language),
    language,
  };
} 