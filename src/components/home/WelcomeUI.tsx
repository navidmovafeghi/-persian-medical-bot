'use client';

import { 
  Lightbulb,
  User,
  Stethoscope,
  Utensils
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { QuickReply, Topic } from '@/types/chat';

interface WelcomeUIProps {
  welcomeOptions: { title: string; description: string }[];
  quickReplies: QuickReply[];
  popularTopics: Topic[];
  onQuickReplyClick: (text: string) => void;
  welcomeAnimationComplete: boolean;
  userName: string;
}

export default function WelcomeUI({
  welcomeOptions,
  quickReplies,
  popularTopics,
  onQuickReplyClick,
  welcomeAnimationComplete,
  userName
}: WelcomeUIProps) {
  return (
    <div className={`flex flex-col items-center justify-center flex-1 transition-opacity duration-500 ${welcomeAnimationComplete ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-3xl w-full px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-1">سلام {userName}!</h1>
          <p className="text-lg text-gray-600">
            من دستیار هوشمند شما هستم. چطور می‌توانم به شما کمک کنم؟
          </p>
        </div>

        {/* Quick Replies */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-right">پاسخ‌های سریع</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => onQuickReplyClick(reply.text)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full px-4 py-2 text-sm transition-colors"
              >
                {reply.text}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Topics */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-right">موضوعات محبوب</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularTopics.map((topic, index) => (
              <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-start">
                  <div className={`${topic.iconBgColor} p-2 rounded-full mr-3`}>
                    {topic.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{topic.title}</h3>
                    <p className="text-sm text-gray-600">{topic.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-right">چند مثال</h2>
          <div className="grid grid-cols-1 gap-2">
            {welcomeOptions.map((option, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm font-medium">{option.title}</p>
                <p className="text-xs text-gray-500">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 