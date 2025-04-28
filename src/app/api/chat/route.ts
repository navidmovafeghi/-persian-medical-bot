import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Mock database for demo purposes
let conversations: Record<string, any> = {};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationId } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'پیام باید ارسال شود.' },
        { status: 400 }
      );
    }

    // Create or retrieve conversation
    let currentConversationId = conversationId;
    if (!currentConversationId) {
      currentConversationId = uuidv4();
      conversations[currentConversationId] = {
        id: currentConversationId,
        messages: []
      };
    } else if (!conversations[currentConversationId]) {
      conversations[currentConversationId] = {
        id: currentConversationId,
        messages: []
      };
    }

    // Add user message to conversation
    const userMessage = {
      id: uuidv4(),
      text: message,
      isUser: true,
      timestamp: new Date().toISOString()
    };
    
    conversations[currentConversationId].messages.push(userMessage);

    // Generate bot response (mock for now)
    let botResponse;
    if (message.toLowerCase().includes('کد') || message.toLowerCase().includes('دکمه')) {
      botResponse = {
        id: uuidv4(),
        text: 'در اینجا مثالی از کد جاوااسکریپت برای دکمه‌های مورد نظر شما آماده کردم:',
        isUser: false,
        timestamp: new Date().toISOString(),
        code: {
          html: '<button id="cancel-button">Cancel</button>\n<button id="send-button">Send</button>',
          css: 'button {\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n}',
          js: 'let cancelButton = document.getElementById("cancel-button");\nlet sendButton = document.getElementById("send-button");\n\ncancelButton.addEventListener("click", function() {\n  console.log("Cancel button clicked");\n});\n\nsendButton.addEventListener("click", function() {\n  console.log("Send button clicked");\n});'
        }
      };
    } else {
      botResponse = {
        id: uuidv4(),
        text: 'لطفاً توجه داشته باشید که من فقط اطلاعات عمومی ارائه می‌دهم و جایگزین مشاوره حرفه‌ای نیستم.',
        isUser: false,
        timestamp: new Date().toISOString()
      };
    }
    
    conversations[currentConversationId].messages.push(botResponse);

    // Return the bot response along with conversation ID
    return NextResponse.json({
      message: botResponse,
      conversationId: currentConversationId
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');

    if (!conversationId) {
      return NextResponse.json(
        { error: 'شناسه گفتگو الزامی است.' },
        { status: 400 }
      );
    }

    const conversation = conversations[conversationId];
    if (!conversation) {
      return NextResponse.json(
        { error: 'گفتگو یافت نشد.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      messages: conversation.messages 
    });
  } catch (error) {
    console.error('Error retrieving conversation:', error);
    return NextResponse.json(
      { error: 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.' },
      { status: 500 }
    );
  }
} 