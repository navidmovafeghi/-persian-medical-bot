import { Stethoscope, Lightbulb, Utensils } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Topic {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

interface QuickReply {
  text: string;
}

interface WelcomeScreenProps {
  onQuickReplyClick: (text: string) => void;
}

export function WelcomeScreen({ onQuickReplyClick }: WelcomeScreenProps) {
  const quickReplies: QuickReply[] = [
    { text: "داستان‌های شب بخیر" },
    { text: "برنامه کاهش وزن" },
    { text: "طرح تجاری" },
    { text: "خلاصه کارهای این ماه" },
    { text: "ترکیب غذای سالم" }
  ];

  const popularTopics: Topic[] = [
    { 
      title: "هوش مصنوعی در سلامت", 
      description: "تحول در تشخیص و درمان برای بهبود نتایج بیماران.",
      icon: <Stethoscope className="h-5 w-5" />,
      iconBgColor: "bg-blue-500"
    },
    { 
      title: "هوش مصنوعی و خلاقیت", 
      description: "توانمندسازی هنرمندان با ابزارهای نوآورانه و امکانات خلاقانه بی‌پایان.",
      icon: <Lightbulb className="h-5 w-5" />,
      iconBgColor: "bg-amber-500"
    },
    { 
      title: "تغذیه و سلامت", 
      description: "بهینه‌سازی رژیم غذایی برای عملکرد بهتر و سلامت.",
      icon: <Utensils className="h-5 w-5" />,
      iconBgColor: "bg-green-500"
    }
  ];

  return (
    <div className="flex flex-col h-full text-right">
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-fade-up animate-once animate-duration-500 animate-delay-300 w-full max-w-[600px] space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">دستیار هوشمند پزشکی پارسی</h1>
            <p className="text-muted-foreground">
              از من هر سؤالی در مورد سلامت، تغذیه، یا مراقبت‌های پزشکی بپرسید
            </p>
          </div>

          {/* Quick replies */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium mb-1">جستجوی سریع</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickReplies.map((reply, index) => (
                <Button
                  key={`quick-reply-${index}`}
                  variant="outline"
                  className="rounded-full text-sm py-1 h-auto"
                  onClick={() => onQuickReplyClick(reply.text)}
                >
                  {reply.text}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Popular topics section */}
          <div className="space-y-3">
            <h2 className="text-lg font-medium mb-2">موضوعات پرطرفدار</h2>
            <div className="grid grid-cols-1 gap-3">
              {popularTopics.map((topic, index) => (
                <Card 
                  key={`topic-${index}`} 
                  className="overflow-hidden cursor-pointer hover:bg-accent/30 transition-colors"
                  onClick={() => onQuickReplyClick(topic.title)}
                >
                  <CardContent className="p-4 flex items-start space-x-4 space-x-reverse">
                    <div className={`p-2 rounded-lg ${topic.iconBgColor} text-white shrink-0`}>
                      {topic.icon}
                    </div>
                    <div className="space-y-1 text-right">
                      <h3 className="font-medium">{topic.title}</h3>
                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 