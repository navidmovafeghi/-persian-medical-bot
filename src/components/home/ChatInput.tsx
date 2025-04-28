'use client';

import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function ChatInput({ input, setInput, handleSubmit, isLoading }: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="پیام خود را اینجا بنویسید..."
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-right"
            dir="rtl"
          />
        </div>
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          <Send className="h-5 w-5" />
          <span className="sr-only">ارسال</span>
        </Button>
      </div>
    </form>
  );
} 