/**
 * Types and interfaces for the chat functionality
 */

export interface Message {
  text: string;
  isUser: boolean;
  timestamp?: Date;
  code?: {
    html?: string;
    css?: string;
    js?: string;
  };
}

export interface QuickReply {
  text: string;
}

export interface Topic {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
}