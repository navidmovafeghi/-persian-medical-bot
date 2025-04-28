import { useState, FormEvent } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  onReset: () => void;
  isLoading: boolean;
}

export function ChatInput({ onSubmit, onReset, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    onSubmit(input);
    setInput('');
  };

  return (
    <Card className="border-0 shadow-none mt-auto">
      <CardFooter className="flex flex-row items-center p-0 gap-2">
        <form onSubmit={handleSubmit} className="flex flex-1 rounded-full border bg-background p-1">
          <input
            type="text"
            placeholder="پیام خود را اینجا بنویسید..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            dir="rtl"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">ارسال پیام</span>
          </Button>
        </form>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onReset}
          title="شروع مکالمه جدید"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">شروع مکالمه جدید</span>
        </Button>
      </CardFooter>
    </Card>
  );
} 