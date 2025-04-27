'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Send, 
  MessageSquare, 
  User, 
  Bot,
  ChevronLeft,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Message {
  text: string;
  isUser: boolean;
  timestamp?: Date;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: 'سلام! من دستیار پزشکی هوشمند شما هستم. چطور می‌توانم کمکتان کنم؟', isUser: false, timestamp: new Date() }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = { text: input, isUser: true, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate bot response (this would be replaced with actual API call)
    setTimeout(() => {
      const botResponse: Message = {
        text: 'لطفاً توجه داشته باشید که من فقط اطلاعات عمومی ارائه می‌دهم و جایگزین مشاوره پزشکی حرفه‌ای نیستم.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);

    setInput('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 py-3 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#0096c7]/10 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-[#0096c7]" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">پزشک یار هوشمند</h1>
            <Badge className="bg-[#0096c7]/15 text-[#0096c7] hover:bg-[#0096c7]/25 hidden md:flex">
              نسخه ۱.۰
            </Badge>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="flex items-center gap-2 border-slate-200 hover:bg-slate-50">
              <LayoutDashboard className="h-4 w-4 text-[#0096c7]" />
              داشبورد
            </Button>
          </Link>
        </div>
      </header>
      
      {/* Main Chat Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4">
        <Card className="border border-slate-200 rounded-md shadow-sm h-[calc(100vh-12rem)] flex flex-col overflow-hidden">
          {/* Custom header instead of CardHeader */}
          <div className="bg-[#0096c7]/10 py-3 px-6 border-b border-[#0096c7]/15 w-full">
            <div className="flex justify-between items-center">
              <div className="text-base font-semibold flex items-center">
                <Bot className="h-4 w-4 ml-1.5 text-[#0096c7]" />
                مکالمه جدید
              </div>
              <Button variant="ghost" size="sm" className="text-[#0096c7] hover:bg-[#0096c7]/10">
                <RefreshCw className="h-3.5 w-3.5 ml-1.5" />
                شروع مجدد
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <CardContent className="p-0 flex-1 overflow-y-auto">
            <div className="flex flex-col p-4 space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.isUser ? 'justify-start' : 'justify-end'}`}
                >
                  <div className="flex items-start gap-3 max-w-[80%]">
                    {message.isUser ? (
                      <Avatar className="mt-1 border border-slate-200">
                        <AvatarFallback className="bg-slate-100 text-slate-500">ش</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="order-2">
                        <Avatar className="mt-1 bg-[#0096c7]/10 border border-[#0096c7]/20">
                          <AvatarFallback className="text-[#0096c7]">ب</AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                    <div 
                      className={`rounded-lg px-4 py-3 ${
                        message.isUser 
                          ? 'bg-white border border-slate-200 text-slate-700' 
                          : 'bg-[#0096c7]/10 border border-[#0096c7]/20 text-slate-700 order-1'
                      }`}
                    >
                      <div className="text-sm">{message.text}</div>
                      {message.timestamp && (
                        <div className="text-xs text-slate-400 mt-1 text-start">
                          {message.timestamp.toLocaleTimeString('fa-IR', {hour: '2-digit', minute: '2-digit'})}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-end">
                  <div className="flex items-start gap-3 max-w-[80%]">
                    <div className="order-2">
                      <Avatar className="mt-1 bg-[#0096c7]/10 border border-[#0096c7]/20">
                        <AvatarFallback className="text-[#0096c7]">ب</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="bg-[#0096c7]/10 border border-[#0096c7]/20 text-slate-700 rounded-lg px-4 py-3 order-1">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 bg-[#0096c7] rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-[#0096c7] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2 w-2 bg-[#0096c7] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          
          {/* Input Area */}
          <CardFooter className="p-0 bg-slate-50">
            <form onSubmit={handleSubmit} className="w-full border-t border-slate-200 p-3">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="سوال خود را بپرسید..."
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0096c7]/50 focus:border-[#0096c7]"
                    disabled={isLoading}
                  />
                </div>
                <Button 
                  type="submit"
                  className="bg-[#0096c7] hover:bg-[#0077b6] text-white flex items-center gap-1"
                  disabled={!input.trim() || isLoading}
                >
                  <Send className="h-4 w-4 ml-1" />
                  ارسال
                </Button>
              </div>
            </form>
          </CardFooter>
        </Card>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-3">
        <div className="max-w-5xl mx-auto text-center text-sm text-slate-500 px-4">
          <p>این یک دستیار پزشکی هوشمند است و جایگزینی برای مشاوره پزشکی تخصصی نیست.</p>
          <div className="flex items-center justify-center mt-2">
            <Button variant="link" size="sm" className="text-[#0096c7]">
              درباره ما
              <ChevronLeft className="h-3 w-3 mr-1" />
            </Button>
            <span className="text-slate-300 mx-2">|</span>
            <Button variant="link" size="sm" className="text-[#0096c7]">
              شرایط استفاده
              <ChevronLeft className="h-3 w-3 mr-1" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
