import { useState } from 'react';
import { Check, CopyIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Message } from '@/services/api/types';

interface ChatMessageProps {
  message: Message;
  index: number;
}

export function ChatMessage({ message, index }: ChatMessageProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('js');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (codeToCopy: string | undefined) => {
    if (!codeToCopy) return;
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div 
      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
      key={`message-${index}`}
    >
      {/* Bot message */}
      {!message.isUser && (
        <div className="flex max-w-[80%] items-start">
          <Avatar className="h-8 w-8 border border-muted mr-2">
            <AvatarImage src="/bot-avatar.png" alt="Bot" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">ربات</AvatarFallback>
          </Avatar>
          <div>
            <div className="bg-muted p-3 rounded-lg mb-1">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
              
              {/* Code snippet display */}
              {message.code && (
                <div className="mt-3 bg-background border rounded-md">
                  <div className="flex justify-between items-center p-2 border-b">
                    <Tabs 
                      defaultValue={activeTab} 
                      className="w-full"
                      onValueChange={(value) => setActiveTab(value as 'html' | 'css' | 'js')}
                    >
                      <TabsList className="bg-transparent border rounded-sm h-8">
                        <TabsTrigger 
                          value="html" 
                          className="text-xs h-6 px-2 rounded-sm data-[state=active]:bg-primary/10"
                        >
                          HTML
                        </TabsTrigger>
                        <TabsTrigger 
                          value="css" 
                          className="text-xs h-6 px-2 rounded-sm data-[state=active]:bg-primary/10"
                        >
                          CSS
                        </TabsTrigger>
                        <TabsTrigger 
                          value="js" 
                          className="text-xs h-6 px-2 rounded-sm data-[state=active]:bg-primary/10"
                        >
                          JavaScript
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleCopyCode(message.code?.[activeTab])}
                      className="h-7 w-7"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="p-3 overflow-x-auto">
                    <pre className="text-xs leading-relaxed">
                      <code>{message.code[activeTab]}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
            <div className="text-xs text-muted-foreground mr-2">
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      )}

      {/* User message */}
      {message.isUser && (
        <div className="flex max-w-[80%] items-start">
          <div className="flex flex-col items-end">
            <Card className="mb-1 border-0 shadow-none">
              <CardContent className="p-3 bg-primary text-primary-foreground rounded-lg">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
              </CardContent>
            </Card>
            <div className="text-xs text-muted-foreground ml-2">
              {formatTime(message.timestamp)}
              <Badge variant="outline" className="mr-1 text-[10px] h-4 py-0 px-1">شما</Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 