import { 
  Lightbulb, 
  User, 
  Stethoscope, 
  Utensils 
} from 'lucide-react';
import { Message, QuickReply, Topic } from '@/types/chat';
import React from 'react';

/**
 * Sample welcome options displayed on the welcome screen
 */
export const welcomeOptions = [
  { title: 'ایجاد فرم خوش‌آمدگویی', description: 'نوشتن کد (HTML، CSS و JS) برای یک فرم ساده خوش‌آمدگویی' },
  { title: 'دستورالعمل‌ها', description: 'چگونه یک شبکه وای‌فای بی‌سیم را راه‌اندازی کنیم؟' },
  { title: 'شغلی', description: 'چگونه روز کاری خود را به طور مؤثر سازماندهی کنیم؟' },
  { title: 'شغلی', description: 'نکاتی برای بهبود بهره‌وری در محل کار' },
  { title: 'آشنایی', description: 'هوش مصنوعی چگونه کار می‌کند؟' },
  { title: 'آشنایی', description: 'شما چه کاری می‌توانید انجام دهید؟' },
];

/**
 * Quick reply options for faster interaction
 */
export const quickReplies: QuickReply[] = [
  { text: "داستان‌های شب بخیر" },
  { text: "برنامه کاهش وزن" },
  { text: "طرح تجاری" },
  { text: "خلاصه کارهای این ماه" },
  { text: "ترکیب غذای سالم" }
];

/**
 * Popular topic cards displayed on the welcome screen
 */
export const popularTopics: Topic[] = [
  { 
    title: "هوش مصنوعی در سلامت", 
    description: "تحول در تشخیص و درمان برای بهبود نتایج بیماران.",
    icon: React.createElement(Stethoscope, { className: "h-5 w-5" }),
    iconBgColor: "bg-blue-500"
  },
  { 
    title: "هوش مصنوعی و خلاقیت", 
    description: "توانمندسازی هنرمندان با ابزارهای نوآورانه و امکانات خلاقانه بی‌پایان.",
    icon: React.createElement(Lightbulb, { className: "h-5 w-5" }),
    iconBgColor: "bg-yellow-500"
  },
  { 
    title: "AI در زندگی روزمره", 
    description: "از دستیارهای مجازی تا سیستم‌های هوشمند خانگی، چگونه AI زندگی ما را تغییر می‌دهد.",
    icon: React.createElement(User, { className: "h-5 w-5" }),
    iconBgColor: "bg-green-500"
  },
  { 
    title: "تغذیه و سلامتی", 
    description: "استفاده از هوش مصنوعی برای برنامه‌های تغذیه و سلامتی شخصی‌سازی شده.",
    icon: React.createElement(Utensils, { className: "h-5 w-5" }),
    iconBgColor: "bg-purple-500"
  }
];

/**
 * Initial welcome message from the bot
 */
export const initialMessage: Message = { 
  text: 'سلام! من دستیار هوشمند شما هستم. چطور می‌توانم کمکتان کنم؟', 
  isUser: false, 
  timestamp: new Date() 
};

/**
 * Example code message for demonstration
 */
export const exampleCodeMessage: Message = {
  text: 'در اینجا مثالی از کد جاوااسکریپت برای دکمه‌های مورد نظر شما آماده کردم:',
  isUser: false,
  timestamp: new Date(),
  code: {
    html: '<button id="cancel-button">Cancel</button>\n<button id="send-button">Send</button>',
    css: 'button {\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n}',
    js: 'let cancelButton = document.getElementById("cancel-button");\nlet sendButton = document.getElementById("send-button");\n\ncancelButton.addEventListener("click", function() {\n  console.log("Cancel button clicked");\n});\n\nsendButton.addEventListener("click", function() {\n  console.log("Send button clicked");\n});'
  }
}; 