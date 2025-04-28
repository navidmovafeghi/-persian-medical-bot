'use client';

import { useState } from 'react';
import { CopyIcon, Check } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Message } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
  index: number;
  copiedStates: { [key: number]: boolean };
  onCopy: (code: string | undefined, messageIndex: number) => void;
}

export default function ChatMessage({ message, index, copiedStates, onCopy }: ChatMessageProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('js');
  
  const getTimeString = (date?: Date) => {
    if (!date) return '';
    return date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!message.isUser && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="/bot-avatar.png" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[80%] ${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
        <div className="flex items-start">
          <div className="flex-1">
            <p className={`text-sm ${message.isUser ? 'text-primary-foreground' : 'text-foreground'}`}>
              {message.text}
            </p>
            
            {message.code && (
              <div className="mt-3 bg-background rounded border border-gray-300 overflow-hidden">
                <div className="flex justify-between items-center px-3 py-1 bg-muted border-b border-gray-300">
                  <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'html' | 'css' | 'js')}>
                    <TabsList className="bg-transparent p-0">
                      <TabsTrigger value="html" className="px-2 py-1 text-xs">HTML</TabsTrigger>
                      <TabsTrigger value="css" className="px-2 py-1 text-xs">CSS</TabsTrigger>
                      <TabsTrigger value="js" className="px-2 py-1 text-xs">JavaScript</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onCopy(message.code?.[activeTab], index)}
                    className="h-6 w-6 p-0"
                  >
                    {copiedStates[index] ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <CopyIcon className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
                
                <TabsContent value="html" className="m-0">
                  <pre className="text-xs p-3 overflow-x-auto">{message.code?.html}</pre>
                </TabsContent>
                <TabsContent value="css" className="m-0">
                  <pre className="text-xs p-3 overflow-x-auto">{message.code?.css}</pre>
                </TabsContent>
                <TabsContent value="js" className="m-0">
                  <pre className="text-xs p-3 overflow-x-auto">{message.code?.js}</pre>
                </TabsContent>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end mt-1">
          <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">
            {getTimeString(message.timestamp)}
          </Badge>
        </div>
      </div>
      
      {message.isUser && (
        <Avatar className="h-8 w-8 ml-2">
          <AvatarImage src="/user-avatar.png" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
} 