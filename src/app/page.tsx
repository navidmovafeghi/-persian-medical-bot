'use client';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ChatMessage, ChatInput, WelcomeScreen } from '@/components/chat';
import { useChat } from '@/hooks';

// Global style to hide scrollbars
const globalStyles = `
  * {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  *::-webkit-scrollbar {
    display: none;
  }
`;

export default function Home() {
  const {
    messages,
    isLoading,
    error,
    showWelcomeUi,
    sendMessage,
    resetConversation
  } = useChat();

  const handleQuickReplyClick = (text: string) => {
    sendMessage(text);
  };

  return (
    <main className="flex flex-col h-dvh max-h-dvh overflow-hidden bg-background">
      {/* Global styles */}
      <style jsx global>{globalStyles}</style>

      {/* Chat container */}
      <div className="flex-1 flex flex-col p-4 pb-0 overflow-hidden">
        {/* Display welcome UI or chat messages */}
        {showWelcomeUi ? (
          <WelcomeScreen onQuickReplyClick={handleQuickReplyClick} />
        ) : (
          <>
            {/* Chat messages */}
            <ScrollArea className="flex-1 pr-4 pb-4">
              <div className="space-y-4 pt-4">
                {messages.map((message, index) => (
                  <ChatMessage 
                    key={message.id || `message-${index}`}
                    message={message} 
                    index={index}
                  />
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-2 space-x-reverse items-center">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Error message */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </>
        )}

        {/* Chat input */}
        <div className="pt-4">
          <ChatInput 
            onSubmit={sendMessage}
            onReset={resetConversation}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
}
