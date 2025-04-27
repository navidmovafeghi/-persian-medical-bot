'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  text: string;
  isUser: boolean;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: 'سلام! من دستیار پزشکی هوشمند شما هستم. چطور می‌توانم کمکتان کنم؟', isUser: false }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate bot response (this would be replaced with actual API call)
    setTimeout(() => {
      const botResponse: Message = {
        text: 'لطفاً توجه داشته باشید که من فقط اطلاعات عمومی ارائه می‌دهم و جایگزین مشاوره پزشکی حرفه‌ای نیستم.',
        isUser: false
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-800">پزشک یار هوشمند</h1>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="outline" className="flex items-center gap-2">
                داشبورد <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 max-w-4xl w-full mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md h-[calc(100vh-12rem)] flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.isUser ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.isUser 
                      ? 'bg-blue-500 text-white rounded-bl-none' 
                      : 'bg-gray-200 text-gray-800 rounded-br-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="سوال خود را بپرسید..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                ارسال
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <footer className="bg-white border-t py-4">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
          <p>این یک دستیار پزشکی هوشمند است و جایگزینی برای مشاوره پزشکی تخصصی نیست.</p>
        </div>
      </footer>
    </div>
  );
}
