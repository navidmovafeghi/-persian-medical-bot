'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Send, 
  MessageSquare, 
  Bot,
  ChevronLeft,
  RefreshCw,
  History,
  CopyIcon,
  Settings,
  BookOpen,
  Bell,
  Menu,
  Check,
  PanelLeftClose,
  PanelRightClose,
  User,
  Lightbulb,
  Stethoscope,
  Utensils
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader,
  SheetTitle,
  SheetClose
} from '@/components/ui/sheet';

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

interface Message {
  text: string;
  isUser: boolean;
  timestamp?: Date;
  code?: {
    html?: string;
    css?: string;
    js?: string;
  };
}

// New interfaces for quick replies and topics
interface QuickReply {
  text: string;
}

interface Topic {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('js');
  const [showWelcomeUi, setShowWelcomeUi] = useState(true);
  const [welcomeAnimationComplete, setWelcomeAnimationComplete] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]); // Start with empty messages for initial centering
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(true);
  const [userName, setUserName] = useState("انریکو");

  // Set animation complete after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeAnimationComplete(true);
    }, 500); // Keep animation timing if desired
    return () => clearTimeout(timer);
  }, []);

  // Add initial bot message after component mounts and welcome is shown
  useEffect(() => {
    if (showWelcomeUi) {
      // Add the initial bot message only when the welcome UI is intended to be shown
      setMessages([
        { 
          text: 'سلام! من دستیار هوشمند شما هستم. چطور می‌توانم کمکتان کنم؟', 
          isUser: false, 
          timestamp: new Date() 
        }
      ]);
    } else {
        // Clear messages if welcome UI is hidden (e.g., user starts typing)
        setMessages([]);
    }
  }, [showWelcomeUi]);

  const exampleCodeMessage: Message = {
    text: 'در اینجا مثالی از کد جاوااسکریپت برای دکمه‌های مورد نظر شما آماده کردم:',
    isUser: false,
    timestamp: new Date(),
    code: {
      html: '<button id="cancel-button">Cancel</button>\n<button id="send-button">Send</button>',
      css: 'button {\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n}',
      js: 'let cancelButton = document.getElementById("cancel-button");\nlet sendButton = document.getElementById("send-button");\n\ncancelButton.addEventListener("click", function() {\n  console.log("Cancel button clicked");\n});\n\nsendButton.addEventListener("click", function() {\n  console.log("Send button clicked");\n});'
    }
  };

  const resetConversation = () => {
    setShowWelcomeUi(true); // Show welcome UI again on reset
    setMessages([ // Reset to initial bot message
      { text: 'سلام! من دستیار هوشمند شما هستم. چطور می‌توانم کمکتان کنم؟', isUser: false, timestamp: new Date() }
    ]);
    setInput('');
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Hide welcome UI when user sends a message
    if (showWelcomeUi) {
      setShowWelcomeUi(false);
      setMessages([]); // Clear initial bot message when starting conversation
    }
    
    const userMessage: Message = { text: input, isUser: true, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate bot response
    setTimeout(() => {
      if (input.toLowerCase().includes('code') || input.toLowerCase().includes('button') || input.includes('کد') || input.includes('دکمه')) {
        setMessages((prev) => [...prev, exampleCodeMessage]);
      } else {
        const botResponse: Message = {
          text: 'لطفاً توجه داشته باشید که من فقط اطلاعات عمومی ارائه می‌دهم و جایگزین مشاوره حرفه‌ای نیستم.',
          isUser: false,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, botResponse]);
      }
      setIsLoading(false);
    }, 1500);

    setInput('');
  };

  const handleCopyCode = (codeToCopy: string | undefined, messageIndex: number) => {
    if (!codeToCopy) return;
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setCopiedStates((prev) => ({ ...prev, [messageIndex]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [messageIndex]: false }));
      }, 2000); 
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  };

  const welcomeOptions = [
    { title: 'ایجاد فرم خوش‌آمدگویی', description: 'نوشتن کد (HTML، CSS و JS) برای یک فرم ساده خوش‌آمدگویی' },
    { title: 'دستورالعمل‌ها', description: 'چگونه یک شبکه وای‌فای بی‌سیم را راه‌اندازی کنیم؟' },
    { title: 'شغلی', description: 'چگونه روز کاری خود را به طور مؤثر سازماندهی کنیم؟' },
    { title: 'شغلی', description: 'نکاتی برای بهبود بهره‌وری در محل کار' },
    { title: 'آشنایی', description: 'هوش مصنوعی چگونه کار می‌کند؟' },
    { title: 'آشنایی', description: 'شما چه کاری می‌توانید انجام دهید؟' },
  ];

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
      iconBgColor: "bg-blue-500" // Adjusted for light theme
    },
    { 
      title: "هوش مصنوعی و خلاقیت", 
      description: "توانمندسازی هنرمندان با ابزارهای نوآورانه و امکانات خلاقانه بی‌پایان.",
      icon: <Lightbulb className="h-5 w-5" />,
      iconBgColor: "bg-yellow-400" // Adjusted for light theme
    },
    { 
      title: "آینده حمل و نقل", 
      description: "کاوش در وسایل نقلیه خودران و راهکارهای حمل و نقل پایدار.",
      icon: <Bot className="h-5 w-5" />,
      iconBgColor: "bg-green-500" // Adjusted for light theme
    },
    { 
      title: "اکتشافات فضایی", 
      description: "به‌روزرسانی‌های ماموریت‌های اخیر، اکتشافات و جستجوی حیات.",
      icon: <Send className="h-5 w-5" />,
      iconBgColor: "bg-purple-500" // Adjusted for light theme
    },
    { 
      title: "هوش مصنوعی در سلامت (تکراری)", 
      description: "تحول در تشخیص و درمان برای بهبود نتایج بیماران.",
      icon: <Stethoscope className="h-5 w-5" />,
      iconBgColor: "bg-blue-500"
    },
    { 
      title: "هوش مصنوعی و خلاقیت (تکراری)", 
      description: "توانمندسازی هنرمندان با ابزارهای نوآورانه و امکانات خلاقانه بی‌پایان.",
      icon: <Lightbulb className="h-5 w-5" />,
      iconBgColor: "bg-yellow-400"
    }
  ];

  const handleQuickReplyClick = (text: string) => {
    setInput(text); // Directly use the text for now
    // Auto-submit the quick reply/topic as a message
    if (text.trim()) {
        if (showWelcomeUi) {
          setShowWelcomeUi(false);
          setMessages([]); // Clear initial bot message
        }
        const userMessage: Message = { text: text, isUser: true, timestamp: new Date() };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        // Simulate bot response for the clicked item
        setTimeout(() => {
            const botResponse: Message = {
                text: `درباره "${text}" اطلاعات بیشتری می‌خواهید؟ الان جستجو می‌کنم...`,
                isUser: false,
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, botResponse]);
            setIsLoading(false);
        }, 1000);
        setInput(''); // Clear input after sending
    }
  };

  return (
    <div 
      className="flex flex-col lg:flex-row h-screen p-4 gap-4 bg-[#f2cc8f] overflow-hidden" // Custom beige background
    >
      <style jsx global>{globalStyles}</style>
      {/* Wrapper for History and Main Content - Adjusted for new bg */} 
      <div 
        className="flex flex-1 bg-white rounded-lg lg:rounded-xl lg:shadow-sm lg:border lg:border-gray-200 overflow-hidden" // Wrapper back to white
      >

        {/* History Sidebar - DESKTOP ONLY - Collapsible - Light theme */} 
        <div className={`hidden lg:block ${isHistoryCollapsed ? 'w-16' : 'w-72'} border-r border-gray-200 overflow-hidden p-4 transition-all duration-300 ease-in-out flex flex-col bg-white`}> {/* Changed from bg-gray-50 to bg-white */} 
          {/* Header Section */} 
          <div className="flex items-center justify-between mb-4"> 
            {/* Title (hidden when collapsed) */} 
            {!isHistoryCollapsed && (
              <h3 className="font-medium text-gray-700 whitespace-nowrap">تاریخچه</h3> // Darker text
            )} 
            {/* Badge (hidden when collapsed) */} 
            {!isHistoryCollapsed && (
               <Badge className="bg-gray-200 text-gray-600 border border-gray-300 hover:bg-gray-300 ml-auto mr-2">۶/۵۰</Badge> // Lighter badge
            )} 

            {/* Toggle Button - Moved to top right */} 
            <Button 
              variant="ghost" 
              size="icon" 
              className={`${isHistoryCollapsed ? 'w-full' : ''} h-8 w-8 text-gray-500 hover:text-gray-800 hover:bg-gray-200`} // Adjusted hover
              onClick={() => setIsHistoryCollapsed(!isHistoryCollapsed)}
            >
              {isHistoryCollapsed ? <PanelRightClose className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />} 
              <span className="sr-only">{isHistoryCollapsed ? 'Expand history' : 'Collapse history'}</span>
            </Button>
          </div>

          {/* Conditional Rendering for Main Content */} 
          {!isHistoryCollapsed && (
            <>
              {/* Scrollable history items */} 
              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-2">
                  {welcomeOptions.map((option, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-100 cursor-pointer"> {/* Lighter border/hover */} 
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> {/* Standard checkbox */} 
                        <div>
                          <h4 className="font-medium text-sm text-gray-800">{option.title}</h4> {/* Darker text */} 
                          <p className="text-xs text-gray-500 mt-0.5">{option.description}</p> {/* Darker text */} 
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Clear History Button */} 
              <div className="flex justify-center pt-4 border-t border-gray-200"> {/* Lighter border */} 
                <Button 
                  variant="outline" 
                  className="w-full border-red-300 hover:border-red-400 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors" // Adjusted red colors
                >
                  <History className="ml-2 h-4 w-4" />
                  پاک کردن تاریخچه
                </Button>
              </div>
            </>
          )}
        </div>
        
        {/* Main Content */} 
        <div className="flex-1 flex flex-col overflow-hidden bg-white"> {/* Keep main chat area white */} 
          {/* Header - Light Theme Text & Border */} 
          <header className="border-b border-gray-200 py-3 px-4 flex items-center justify-center relative bg-white"> {/* Ensure header matches white chat area */} 
            {/* Mobile History Trigger */} 
            <div className="absolute left-4 lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-800 hover:bg-gray-100"> {/* Adjusted colors */} 
                    <History className="h-5 w-5" />
                    <span className="sr-only">Open History</span>
                  </Button>
                </SheetTrigger>
                {/* Mobile History Sheet - Light Theme */} 
                <SheetContent side="left" className="w-72 p-4 overflow-auto bg-white border-r border-gray-200"> {/* White bg, border */} 
                   <SheetHeader className="mb-4 border-b border-gray-200 pb-4"> {/* Lighter border */} 
                     <SheetTitle><span className="sr-only">History Sidebar</span></SheetTitle> 
                     <h3 className="font-medium text-gray-700 text-center">تاریخچه</h3> {/* Darker text */} 
                   </SheetHeader>
                   {/* Mobile History Content - Light Theme */} 
                  <div className="mt-4 space-y-2">
                    {welcomeOptions.map((option, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer"> {/* Lighter border/hover */} 
                        <div className="flex items-start gap-2">
                          <input type="checkbox" className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> {/* Standard checkbox */} 
                          <div>
                            <h4 className="font-medium text-sm text-gray-800">{option.title}</h4> {/* Darker text */} 
                            <p className="text-xs text-gray-500 mt-0.5">{option.description}</p> {/* Darker text */} 
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 flex justify-center mt-4 border-t border-gray-200"> {/* Lighter border */} 
                    <Button 
                      variant="outline" 
                      className="w-full border-red-300 hover:border-red-400 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors" // Adjusted red colors
                    >
                      <History className="ml-2 h-4 w-4" />
                      پاک کردن تاریخچه
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Mobile Settings Trigger */} 
            <div className="absolute right-4 lg:hidden">
               <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-800 hover:bg-gray-100"> {/* Adjusted colors */} 
                    <Menu className="h-5 w-5" /> 
                    <span className="sr-only">Open Settings Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="w-64 p-0 border-l border-gray-200 flex flex-col bg-white" // White bg, lighter border
                >
                  <SheetHeader className="p-4 border-b border-gray-200"> {/* Lighter border */} 
                    <SheetTitle><span className="sr-only">Settings Menu</span></SheetTitle> 
                    {/* Optional: Add visible title */} 
                    <h3 className="font-medium text-gray-700 text-center">منو</h3> 
                  </SheetHeader>
                  <nav className="p-2">
                    <Link href="/dashboard">
                      <Button 
                        variant="default"
                        className="w-full justify-center text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        <LayoutDashboard className="ml-2 h-5 w-5" />
                        داشبورد
                      </Button>
                    </Link>
                    
                    <Link href="/food-diary" className="mt-2 block">
                      <Button 
                        variant="default"
                        className="w-full justify-center text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        <Utensils className="ml-2 h-5 w-5" />
                        دفترچه غذایی
                      </Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </header>
          
          {/* Chat Area */} 
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages scroll area */} 
            <div className="flex-1 overflow-auto">
              <ScrollArea className={`h-full px-4 pt-4 ${showWelcomeUi ? 'overflow-hidden' : ''}`}>

                {/* Center Welcome UI within ScrollArea when shown */} 
                {showWelcomeUi && (
                 <div className="flex h-full flex-col items-center justify-start text-center pb-12 overflow-hidden">
                    {/* Simple Welcome Message - Fixed */} 
                    <div className="mb-8 p-4 max-w-sm w-full mx-auto transition-all duration-500 ease-in-out transform-gpu translate-y-0 opacity-100 scale-100 mt-8"
                         style={{ 
                             transform: !welcomeAnimationComplete ? 'translateY(20px) scale(0.95)' : 'translateY(0) scale(1)',
                             opacity: !welcomeAnimationComplete ? 0.5 : 1
                         }}>
                       <Bot size={48} className="mx-auto text-blue-500 mb-4" />
                       <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1">سلام، {userName}</h1>
                       <h2 className="text-base font-normal text-gray-600 mb-2">چطور می‌توانم امروز کمکتان کنم؟</h2>
                     </div>

                    {/* Suggested Quick Replies - Fixed */} 
                    <div 
                        className="w-full max-w-2xl px-3 mx-auto mb-8 transition-all duration-500 ease-in-out delay-150 overflow-visible"
                        style={{ opacity: !welcomeAnimationComplete ? 0 : 1 }}>
                        <div className="flex flex-wrap justify-center gap-2 pb-2">
                            {quickReplies.map((reply, index) => (
                                <Button
                                    key={index}
                                    variant="outline" // Outline variant for light theme
                                    size="sm"
                                    className="rounded-full flex-shrink-0 h-8 px-4 text-xs md:text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-blue-600 shadow-sm"
                                    onClick={() => handleQuickReplyClick(reply.text)}
                                >
                                    {reply.text}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Popular Topics (Shadcn Card - Light theme) - Scrollable */} 
                    <div className="w-full max-w-3xl px-3 mx-auto transition-all duration-500 ease-in-out delay-300"
                         style={{ opacity: !welcomeAnimationComplete ? 0 : 1 }}>
                        <div className="flex justify-between items-center mb-3 md:mb-4">
                            <h3 className="text-base md:text-lg font-semibold text-gray-700">موضوعات محبوب</h3>
                        </div>
                        {/* Scrollable container for topic cards only */}
                        <div className="h-64 overflow-y-auto pr-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {popularTopics.map((topic, index) => (
                                    <Card 
                                        key={index} 
                                        className="bg-white border-gray-200 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 cursor-pointer overflow-hidden"
                                        onClick={() => handleQuickReplyClick(topic.title)} 
                                    >
                                        <CardContent className="p-3 flex flex-row-reverse items-start justify-between h-full space-x-reverse space-x-2"> 
                                            <div className={`${topic.iconBgColor} rounded-lg p-2 text-white shadow-sm flex-shrink-0 mt-0.5 ring-1 ring-black/5`}> 
                                                {topic.icon}
                                            </div>
                                            <div className="overflow-hidden flex-grow"> 
                                                <h4 className="font-semibold text-sm text-gray-800 mb-1">{topic.title}</h4> 
                                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{topic.description}</p> 
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
               )}

              {/* Regular Chat Messages - Light theme */} 
              {!showWelcomeUi && messages.length > 0 && (
                <div className="space-y-6 pb-6"> {/* Slightly reduced spacing */} 
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-3xl flex ${message.isUser ? 'flex-row-reverse' : 'flex-row'} gap-2`}> {/* Reduced gap */} 
                        <Avatar className={`mt-0.5 h-8 w-8 ${message.isUser ? 'bg-blue-500' : 'bg-gray-200'}`}> {/* Adjusted size/color */} 
                          <AvatarFallback className={`text-xs ${message.isUser ? 'text-white' : 'text-gray-500'}`}>{message.isUser ? 'ش' : 'ه'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className={`rounded-lg px-4 py-2.5 shadow-sm ${  // Adjusted padding */}
                            message.isUser 
                              ? 'bg-blue-500 text-white' // User message: Primary color 
                              : 'bg-gray-100 border border-gray-200 text-gray-800' // Bot message: Light gray
                          }`}>
                            <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                          </div>
                          
                          {/* Code display - Light Theme */} 
                          {message.code && (
                            <div className="mt-2 border border-gray-200 rounded-lg overflow-hidden bg-white"> {/* Lighter border, white bg */} 
                              <div className="flex border-b border-gray-200 bg-gray-50"> {/* Lighter border, light tab bar bg */} 
                                <button 
                                  className={`py-1.5 px-3 text-xs font-medium transition-colors ${activeTab === 'html' ? 'bg-white text-blue-600 border-b-2 border-blue-500' : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`} // Active state style
                                  onClick={() => setActiveTab('html')}
                                >
                                  HTML
                                </button>
                                <button 
                                  className={`py-1.5 px-3 text-xs font-medium transition-colors ${activeTab === 'css' ? 'bg-white text-blue-600 border-b-2 border-blue-500' : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                                  onClick={() => setActiveTab('css')}
                                >
                                  CSS
                                </button>
                                <button 
                                  className={`py-1.5 px-3 text-xs font-medium transition-colors ${activeTab === 'js' ? 'bg-white text-blue-600 border-b-2 border-blue-500' : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                                  onClick={() => setActiveTab('js')}
                                >
                                  JS
                                </button>
                                <div className="ml-auto flex items-center px-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-7 w-7 text-gray-500 hover:text-gray-800 hover:bg-gray-200" // Adjusted colors
                                    onClick={() => handleCopyCode(message.code?.[activeTab], index)}
                                  >
                                    {copiedStates[index] ? (
                                      <Check className="h-4 w-4 text-green-600" /> // Darker green check
                                    ) : (
                                      <CopyIcon className="h-3.5 w-3.5" />
                                    )}
                                    <span className="sr-only">{copiedStates[index] ? 'Copied!' : 'Copy code'}</span>
                                  </Button>
                                </div>
                              </div>
                              {/* Consider using a syntax highlighter library here for better code display */} 
                              <pre className="p-3 overflow-x-auto text-sm text-gray-800 font-mono bg-gray-50/50"> {/* Lighter code bg, darker text */} 
                                {message.code[activeTab]}
                              </pre>
                            </div>
                          )}
                          
                          {message.timestamp && (
                            <div className="text-xs text-gray-400 mt-1 ml-1"> {/* Lighter timestamp */} 
                              {message.timestamp.toLocaleTimeString('fa-IR', {hour: '2-digit', minute: '2-digit'})}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Loading Indicator - Light Theme */} 
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 max-w-3xl"> {/* Reduced gap */} 
                        <Avatar className="mt-0.5 h-8 w-8 bg-gray-200"> {/* Adjusted size/color */} 
                          <AvatarFallback className="text-xs text-gray-500">ه</AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3"> {/* Lighter bg/border */} 
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce"></div> {/* Adjusted size/color */} 
                            <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              </ScrollArea>
            </div>

            {/* Input form - Light Theme */}
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-100">
              <div className="w-full max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="w-full flex gap-2 items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="پیام خود را بنویسید..."
                    className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 disabled:opacity-50 shadow-sm transition-all"
                    disabled={isLoading}
                    dir="rtl"
                  />
                  <Button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 aspect-square flex items-center justify-center disabled:opacity-50 shadow-sm hover:shadow transition-all"
                    disabled={!input.trim() || isLoading}
                    aria-label="ارسال پیام"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Sidebar - DESKTOP ONLY - Matching custom bg */} 
      <div 
        className="hidden lg:flex w-40 flex-col bg-[#f2cc8f]" // Reduced width to w-40
      >
        {/* Desktop Light Sidebar Content START */} 
        <nav className="p-2 mt-2"> 
          <Link href="/dashboard">
            <Button 
              variant="default"
              className="w-full justify-center text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 px-3 py-3 rounded-md transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg border-2 border-gray-500"
            >
              <LayoutDashboard className="ml-2 h-6 w-6" />
              داشبورد
            </Button>
          </Link>
          
          <Link href="/food-diary" className="mt-3 block">
            <Button 
              variant="default"
              className="w-full justify-center text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 px-3 py-3 rounded-md transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg border-2 border-gray-500"
            >
              <Utensils className="ml-2 h-6 w-6" />
              دفترچه غذایی
            </Button>
          </Link>
        </nav>
        {/* Desktop Light Sidebar Content END */} 
      </div>
    </div>
  );
}
