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
  Stethoscope
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
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: 'سلام! من دستیار هوشمند شما هستم. چطور می‌توانم کمکتان کنم؟', 
      isUser: false, 
      timestamp: new Date() 
    }
  ]);
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(false);
  const [userName, setUserName] = useState("انریکو");

  // Set animation complete after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeAnimationComplete(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
    setMessages([
      { text: 'سلام! من دستیار هوشمند شما هستم. چطور می‌توانم کمکتان کنم؟', isUser: false, timestamp: new Date() }
    ]);
    setInput('');
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Hide welcome UI when user sends a message
    setShowWelcomeUi(false);

    // Add user message
    const userMessage: Message = { text: input, isUser: true, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate bot response (this would be replaced with actual API call)
    setTimeout(() => {
      // Add a code example message sometimes
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

  // Function to handle copying code
  const handleCopyCode = (codeToCopy: string | undefined, messageIndex: number) => {
    if (!codeToCopy) return;
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setCopiedStates((prev) => ({ ...prev, [messageIndex]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [messageIndex]: false }));
      }, 2000); // Reset after 2 seconds
    }).catch(err => {
      console.error('Failed to copy code: ', err);
      // Optionally: Add user feedback for copy failure
    });
  };

  // List of welcome form options for the history sidebar
  const welcomeOptions = [
    { title: 'ایجاد فرم خوش‌آمدگویی', description: 'نوشتن کد (HTML، CSS و JS) برای یک فرم ساده خوش‌آمدگویی' },
    { title: 'دستورالعمل‌ها', description: 'چگونه یک شبکه وای‌فای بی‌سیم را راه‌اندازی کنیم؟' },
    { title: 'شغلی', description: 'چگونه روز کاری خود را به طور مؤثر سازماندهی کنیم؟' },
    { title: 'شغلی', description: 'نکاتی برای بهبود بهره‌وری در محل کار' },
    { title: 'آشنایی', description: 'هوش مصنوعی چگونه کار می‌کند؟' },
    { title: 'آشنایی', description: 'شما چه کاری می‌توانید انجام دهید؟' },
  ];

  // Quick Reply options (Translated)
  const quickReplies: QuickReply[] = [
    { text: "داستان‌های شب بخیر" },
    { text: "برنامه کاهش وزن" },
    { text: "طرح تجاری" },
    { text: "خلاصه کارهای این ماه" },
    { text: "ترکیب غذای سالم" }
  ];

  // Popular topics (Translated)
  const popularTopics: Topic[] = [
    { 
      title: "هوش مصنوعی در سلامت", 
      description: "تحول در تشخیص و درمان برای بهبود نتایج بیماران.",
      icon: <Stethoscope className="h-5 w-5" />,
      iconBgColor: "bg-blue-600"
    },
    { 
      title: "هوش مصنوعی و خلاقیت", 
      description: "توانمندسازی هنرمندان با ابزارهای نوآورانه و امکانات خلاقانه بی‌پایان.",
      icon: <Lightbulb className="h-5 w-5" />,
      iconBgColor: "bg-yellow-500"
    },
    { 
      title: "آینده حمل و نقل", 
      description: "کاوش در وسایل نقلیه خودران و راهکارهای حمل و نقل پایدار.",
      icon: <Bot className="h-5 w-5" />,
      iconBgColor: "bg-green-500"
    },
    { 
      title: "اکتشافات فضایی", 
      description: "به‌روزرسانی‌های ماموریت‌های اخیر، اکتشافات و جستجوی حیات.",
      icon: <Send className="h-5 w-5" />,
      iconBgColor: "bg-purple-500"
    },
    { 
      title: "هوش مصنوعی در سلامت (تکراری)", 
      description: "تحول در تشخیص و درمان برای بهبود نتایج بیماران.",
      icon: <Stethoscope className="h-5 w-5" />,
      iconBgColor: "bg-blue-600"
    },
    { 
      title: "هوش مصنوعی و خلاقیت (تکراری)", 
      description: "توانمندسازی هنرمندان با ابزارهای نوآورانه و امکانات خلاقانه بی‌پایان.",
      icon: <Lightbulb className="h-5 w-5" />,
      iconBgColor: "bg-yellow-500"
    }
  ];

  // Handle Quick Reply click (Updated template literal)
  const handleQuickReplyClick = (text: string) => {
    if (popularTopics.some(topic => topic.title === text)) {
      // If it's a topic title, use the Persian template
      setInput(`درباره ${text} به من بگو`);
    } else {
      // Otherwise, use the direct reply text
      setInput(text);
    }
    setShowWelcomeUi(false);
  };

  return (
    <div 
      className="flex flex-col lg:flex-row min-h-screen p-4 gap-4 bg-[#003566]"
    >
      {/* Wrapper for History and Main Content - Added mobile rounding */}
      <div 
        className="flex flex-1 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg lg:rounded-xl lg:shadow-md lg:border lg:border-slate-700 overflow-hidden"
        style={{}}
      >

        {/* History Sidebar - DESKTOP ONLY - Collapsible */}
        <div className={`hidden lg:block ${isHistoryCollapsed ? 'w-16' : 'w-72'} border-r border-slate-700 overflow-hidden p-4 transition-all duration-300 ease-in-out flex flex-col`}>
          {/* Header Section */} 
          <div className="flex items-center justify-between mb-4"> 
            {/* Title (hidden when collapsed) */} 
            {!isHistoryCollapsed && (
              <h3 className="font-medium text-slate-200 whitespace-nowrap">تاریخچه</h3>
            )} 
            {/* Badge (hidden when collapsed) */} 
            {!isHistoryCollapsed && (
               <Badge className="bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600 ml-auto mr-2">۶/۵۰</Badge> 
            )} 

            {/* Toggle Button - Moved to top right */} 
            <Button 
              variant="ghost" 
              size="icon" 
              className={`${isHistoryCollapsed ? 'w-full' : ''} h-8 w-8 text-slate-400 hover:text-slate-100 hover:bg-slate-700`}
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
                    <div key={index} className="border border-slate-700 rounded-lg p-3 hover:bg-slate-700/50 cursor-pointer">
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1 rounded border-slate-600 bg-slate-800 focus:ring-cyan-500 text-cyan-500" /> 
                        <div>
                          <h4 className="font-medium text-sm text-slate-200">{option.title}</h4> 
                          <p className="text-xs text-slate-400 mt-0.5">{option.description}</p> 
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Clear History Button */} 
              <div className="flex justify-center pt-4 border-t border-slate-700"> {/* Added top border */} 
                <Button 
                  variant="outline" 
                  className="w-full border-red-500/50 hover:border-red-500/70 hover:bg-red-900/50 text-red-400 hover:text-red-200 transition-colors"
                >
                  <History className="ml-2 h-4 w-4" />
                  پاک کردن تاریخچه
                </Button>
              </div>
            </>
          )}

          {/* Removed Toggle Button Container from bottom */} 

        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header - Dark Theme Text & Border */}
          <header className="border-b border-slate-700 py-3 px-4 flex items-center justify-center">
            {/* Mobile History Trigger - Remains on the left (Sheet is likely light) */}
            <div className="absolute left-4 lg:hidden">
              {/* ... Sheet Trigger ... */}
              <Sheet>
                <SheetTrigger asChild>
                  {/* Button color might need adjustment if header bg changes significantly */}
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-100">
                    <History className="h-5 w-5" />
                    <span className="sr-only">Open History</span>
                  </Button>
                </SheetTrigger>
                {/* Mobile History Sheet - Dark Theme */}
                <SheetContent side="left" className="w-72 p-4 overflow-auto bg-slate-900 border-l-0"> {/* Changed bg, removed border */} 
                   <SheetHeader className="mb-4 border-b border-slate-700 pb-4"> {/* Added border */} 
                     <SheetTitle><span className="sr-only">History Sidebar</span></SheetTitle> 
                     {/* Add visible title for dark sheet? */}
                     <h3 className="font-medium text-slate-200 text-center">تاریخچه</h3>
                   </SheetHeader>
                   {/* Mobile History Content - Dark Theme */} 
                  <div className="mt-4 space-y-2">
                    {welcomeOptions.map((option, index) => (
                      <div key={index} className="border border-slate-700 rounded-lg p-3 hover:bg-slate-800 cursor-pointer">
                        <div className="flex items-start gap-2">
                          <input type="checkbox" className="mt-1 rounded border-slate-600 bg-slate-800 focus:ring-cyan-500 text-cyan-500" />
                          <div>
                            <h4 className="font-medium text-sm text-slate-200">{option.title}</h4>
                            <p className="text-xs text-slate-400 mt-0.5">{option.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 flex justify-center mt-4">
                     {/* Recolored Clear History Button */}
                    <Button 
                      variant="outline" 
                      className="w-full border-red-500/50 hover:border-red-500/70 hover:bg-red-900/50 text-red-400 hover:text-red-200 transition-colors"
                    >
                      <History className="ml-2 h-4 w-4" />
                      پاک کردن تاریخچه
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Centered Title - Dark Theme Text */}
            <h2 className="text-lg font-medium text-slate-200">دستیار هوشمند گفتگو</h2> {/* Adjusted text */} 

            {/* Mobile Dark Sidebar/Settings Trigger - Remains on the right (Sheet has dark bg) */}
            <div className="absolute right-4 lg:hidden">
               {/* ... Sheet Trigger ... */}
               <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-100">
                    <Menu className="h-5 w-5" /> 
                    <span className="sr-only">Open Settings Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="w-64 p-0 border-l-0 flex flex-col bg-[#003566]"
                >
                   {/* ... Mobile dark sidebar content ... */}
                  <SheetHeader className="p-4 border-b border-white/10"> {/* Added subtle border */}
                    <SheetTitle><span className="sr-only">Settings Menu</span></SheetTitle> 
                  </SheetHeader>
                  <nav className="p-2">
                    <Link href="/dashboard">
                      <Button 
                        variant="outline"
                        className="w-full justify-center text-sm font-medium border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/20 text-white hover:text-white px-3 py-2 rounded-md transition-colors"
                      >
                        <LayoutDashboard className="ml-2 h-5 w-5" />
                        داشبورد
                      </Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </header>
          
          {/* Chat Area */} 
          <div className="flex-1 p-4 overflow-hidden flex flex-col">
            {/* Messages scroll area */} 
            <ScrollArea className="flex-1 p-4">
              {/* Welcome UI */}
              {showWelcomeUi && (
                <div className="h-full flex flex-col items-center justify-start pt-4 md:pt-10 pb-12">
                  {/* Welcome Message (Translated) */}
                  <div className="text-center mb-6 md:mb-8 bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg p-4 max-w-sm w-full mx-auto shadow-md transition-all duration-500 ease-in-out transform-gpu translate-y-0 opacity-100 scale-100"
                       style={{ 
                         transform: !welcomeAnimationComplete ? 'translateY(20px) scale(0.95)' : 'translateY(0) scale(1)',
                         opacity: !welcomeAnimationComplete ? 0.5 : 1
                       }}>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">سلام، {userName}</h1>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">چطور می‌توانم کمکتان کنم؟</h2>
                    <p className="text-xs text-pink-700 opacity-75">آخرین بروزرسانی: ۲۰۲۴/۱۰/۱۰</p>
                  </div>

                  {/* Suggested Quick Replies (Horizontal Scroll - Shadcn Button) */}
                  <div 
                    className="w-full max-w-2xl px-3 mx-auto mb-6 md:mb-8 transition-all duration-500 ease-in-out delay-150 overflow-hidden -mb-2"
                    style={{ 
                      opacity: !welcomeAnimationComplete ? 0 : 1,
                    }}
                  >
                    <div 
                      className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide"
                      style={{ 
                        scrollbarWidth: 'none', /* Firefox */ 
                        msOverflowStyle: 'none' /* IE 10+ */
                      }}
                    >
                      {/* Ensure scrollbar-hide style is available (it's defined below for topics) */}
                      {quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          variant="secondary" // Use Shadcn secondary variant
                          size="sm" // Use smaller size
                          className="rounded-full flex-shrink-0 h-8 px-4 text-xs md:text-sm font-medium shadow-sm"
                          onClick={() => handleQuickReplyClick(reply.text)}
                        >
                          {reply.text}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Popular Topics (Translated Heading & Shadcn Card) */}
                  <div className="w-full max-w-2xl px-3 mx-auto transition-all duration-500 ease-in-out delay-300"
                       style={{ 
                         opacity: !welcomeAnimationComplete ? 0 : 1
                       }}>
                    <div className="flex justify-between items-center mb-3 md:mb-4">
                      <h3 className="text-base md:text-lg font-semibold text-white">موضوعات محبوب</h3>
                      {/* <Link href="#" className="text-pink-400 text-xs hover:text-pink-300 font-medium transition-colors">See all</Link> */}
                    </div>
                    {/* Removed wrapper div - applying scrollbar hiding directly */}
                    <div 
                      className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide" 
                      style={{ 
                        scrollbarWidth: 'none', /* Firefox */ 
                        msOverflowStyle: 'none' /* Internet Explorer 10+ */
                      }}
                    >
                      {/* Webkit scrollbar hiding */}
                      <style>{`
                        .scrollbar-hide::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>
                      {popularTopics.map((topic, index) => (
                        <Card 
                          key={index} 
                          className="bg-slate-800/70 border-slate-700 hover:bg-slate-700/90 transition-colors duration-200 cursor-pointer w-48 flex-shrink-0 overflow-hidden"
                          onClick={() => handleQuickReplyClick(topic.title)} 
                        >
                          {/* Use flex-row-reverse for RTL, justify-between, items-start */}
                          <CardContent className="p-3 flex flex-row-reverse items-start justify-between h-full space-x-reverse space-x-2"> 
                            {/* Icon Container */}
                            <div className={`${topic.iconBgColor} rounded-full p-2 text-white shadow-sm flex-shrink-0 mt-0.5 ring-1 ring-white/10`}> {/* Added ring */}
                              {topic.icon}
                            </div>
                            {/* Text Container */}
                            <div className="overflow-hidden flex-grow"> 
                              <h4 className="font-semibold text-sm text-slate-100 mb-1.5">{topic.title}</h4> {/* Increased mb */}
                              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{topic.description}</p> {/* Use line-clamp-2, leading-relaxed */} 
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Regular Chat Messages */}
              {!showWelcomeUi && (
                <div className="space-y-8 pb-6">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-3xl flex ${message.isUser ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                        <Avatar className={`mt-1 ${message.isUser ? 'bg-blue-500' : 'bg-slate-600'}`}>
                          <AvatarFallback className={`${message.isUser ? 'text-white' : 'text-slate-300'}`}>{message.isUser ? 'ش' : 'ه'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className={`rounded-lg px-5 py-3 shadow-md ${ 
                            message.isUser 
                              ? 'bg-cyan-600 text-white'
                              : 'bg-slate-700 border border-slate-600 text-slate-200'
                          }`}>
                            <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                          </div>
                          
                          {/* Code display - Dark Theme */}
                          {message.code && (
                            <div className="mt-3 border border-slate-600 rounded-lg overflow-hidden bg-slate-800">
                              <div className="flex border-b border-slate-600">
                                <button 
                                  className={`py-1.5 px-4 text-xs font-medium transition-colors ${activeTab === 'html' ? 'bg-slate-700 text-slate-100' : 'bg-transparent text-slate-400 hover:bg-slate-700/50'}`}
                                  onClick={() => setActiveTab('html')}
                                >
                                  HTML
                                </button>
                                <button 
                                  className={`py-1.5 px-4 text-xs font-medium transition-colors ${activeTab === 'css' ? 'bg-slate-700 text-slate-100' : 'bg-transparent text-slate-400 hover:bg-slate-700/50'}`}
                                  onClick={() => setActiveTab('css')}
                                >
                                  CSS
                                </button>
                                <button 
                                  className={`py-1.5 px-4 text-xs font-medium transition-colors ${activeTab === 'js' ? 'bg-slate-700 text-slate-100' : 'bg-transparent text-slate-400 hover:bg-slate-700/50'}`}
                                  onClick={() => setActiveTab('js')}
                                >
                                  JS
                                </button>
                                <div className="ml-auto flex items-center px-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-7 w-7 text-slate-400 hover:text-slate-100"
                                    onClick={() => handleCopyCode(message.code?.[activeTab], index)}
                                  >
                                    {copiedStates[index] ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <CopyIcon className="h-3.5 w-3.5" />
                                    )}
                                    <span className="sr-only">{copiedStates[index] ? 'Copied!' : 'Copy code'}</span>
                                  </Button>
                                </div>
                              </div>
                              <pre className="p-4 overflow-x-auto text-sm text-slate-300 font-mono bg-slate-900/50">
                                {message.code[activeTab]}
                              </pre>
                            </div>
                          )}
                          
                          {message.timestamp && (
                            <div className="text-xs text-slate-500 mt-1 ml-1">
                              {message.timestamp.toLocaleTimeString('fa-IR', {hour: '2-digit', minute: '2-digit'})}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Loading Indicator - Dark Theme */} 
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-3xl">
                        <Avatar className="mt-1 bg-slate-600">
                          <AvatarFallback className="text-slate-300">ه</AvatarFallback>
                        </Avatar>
                        <div className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3">
                          <div className="flex items-center gap-1">
                            {/* Use lighter color for dots */}
                            <div className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce"></div>
                            <div className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Input form - Removed dark background */}
            <CardFooter className="p-2 lg:p-4 mt-auto border-t border-slate-700">
              <div className="w-full space-y-2">
                <form onSubmit={handleSubmit} className="w-full flex gap-3 items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="پیام خود را بنویسید..."
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-full px-5 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-3 aspect-square flex items-center justify-center disabled:opacity-50"
                    disabled={!input.trim() || isLoading}
                    aria-label="ارسال پیام"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
                
                {/* Centered disclaimer - Dark Theme Text */}
                <div className="text-center text-xs text-slate-500 w-full px-4">
                  <span>نسخه پیش‌نمایش رایگان. ممکن است اطلاعات نادرست درباره افراد، مکان‌ها یا حقایق ارائه شود.</span>
                </div>
              </div>
            </CardFooter>
          </div>
        </div>
      </div>
      
      {/* Right Sidebar - DESKTOP ONLY - Dark Theme */}
      <div 
        className="hidden lg:flex w-64 flex-col bg-[#003566]"
      >
        {/* Desktop Dark Sidebar Content START */}
        <nav className="p-2">
          <Link href="/dashboard">
            <Button 
              variant="outline"
              className="w-full justify-center text-sm font-medium border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/20 text-white hover:text-white px-3 py-2 rounded-md transition-colors"
            >
              <LayoutDashboard className="ml-2 h-5 w-5" />
              داشبورد
            </Button>
          </Link>
        </nav>
        {/* Desktop Dark Sidebar Content END */}
      </div>
    </div>
  );
}
