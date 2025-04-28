"use client";

import { 
  Calendar, 
  Pill, 
  UserRound,
  Clock,
  Activity,
  Heart,
  CheckCircle2,
  List,
  MessageSquare,
  PlusCircle,
  ChevronDown,
  LayoutDashboard,
  Settings,
  Info,
  CheckCircle,
  MoreHorizontal
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample sparkline data (would be real data in production)
const healthTrends = {
  glucose: [102, 98, 105, 110, 107, 102],
  bloodPressure: [120, 118, 125, 122, 119, 120],
  weight: [78, 78.5, 78.2, 77.9, 78, 78]
};

export default function DashboardPage() {
  const today = new Date();
  const persianDate = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(today);

  // State for personalization preferences
  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed');
  const [medicationStreak, setMedicationStreak] = useState(7); // Sample streak count

  // Toggles between detailed and compact view
  const toggleViewMode = () => {
    setViewMode(viewMode === 'detailed' ? 'compact' : 'detailed');
  };

  // Simulates marking a task as complete
  const markComplete = (taskId: string) => {
    // Would update state and API in real implementation
    console.log(`Task ${taskId} marked as complete`);
    // For demo, increment streak if it's a medication task
    if (taskId.includes('medication')) {
      setMedicationStreak(medicationStreak + 1);
    }
  };

  // Mini sparkline component
  const SparkLine = ({ data, color }: { data: number[], color: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <div className="flex items-end h-6 gap-[2px]">
        {data.map((value, index) => {
          const height = range === 0 ? 50 : ((value - min) / range) * 100;
          return (
            <div 
              key={index}
              style={{ 
                height: `${Math.max(15, height)}%`,
                backgroundColor: color,
                width: '4px',
                borderRadius: '1px'
              }}
              className={`${index === data.length - 1 ? 'opacity-100' : 'opacity-60'}`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome header without card container */}
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 mb-2">
        <div className="flex items-center gap-5">
          <Avatar className="w-16 h-16 border-4 border-white shadow-sm hidden md:flex">
            <AvatarImage src="/placeholder-avatar.jpg" alt="علی" />
            <AvatarFallback className="text-xl bg-gray-100 text-slate-600">ع</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-800">سلام، علی!</h1>
            </div>
            <p className="text-slate-600 mt-1 text-sm">{persianDate}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={toggleViewMode}
                  variant="outline" 
                  size="icon" 
                  className="border-slate-200"
                  aria-label="تغییر حالت نمایش"
                >
                  <LayoutDashboard className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>تغییر حالت نمایش</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Link href="/">
            <Button className="bg-[#c19a48] hover:bg-[#a17c34] text-white flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              گفتگو با دستیار هوشمند
            </Button>
          </Link>
        </div>
      </div>

      {/* Health metrics visualization strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-slate-200 rounded-md shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <div className="bg-red-100 p-2 rounded-full">
                <Activity className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">قند خون</p>
                <p className="text-lg font-bold text-slate-800">۱۰۲ mg/dL</p>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col ml-2">
                    <SparkLine data={healthTrends.glucose} color="#f87171" />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>هفته گذشته</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>محدوده نرمال: ۷۰-۱۰۰ mg/dL</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
        
        <Card className="border border-slate-200 rounded-md shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Heart className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">فشار خون</p>
                <p className="text-lg font-bold text-slate-800">۱۲۰/۸۰ mmHg</p>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col ml-2">
                    <SparkLine data={healthTrends.bloodPressure} color="#60a5fa" />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>هفته گذشته</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>محدوده نرمال: ۹۰/۶۰ تا ۱۲۰/۸۰ mmHg</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
        
        <Card className="border border-slate-200 rounded-md shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-full">
                <UserRound className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">وزن</p>
                <p className="text-lg font-bold text-slate-800">۷۸ کیلوگرم</p>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col ml-2">
                    <SparkLine data={healthTrends.weight} color="#4ade80" />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>هفته گذشته</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>هدف: ۷۵ کیلوگرم</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
      </div>

      {/* Combined card for both tracking items and future tasks */}
      <Card className="border border-slate-200 rounded-md shadow-sm p-0 overflow-hidden">
        <CardHeader className="bg-[#e6bf7a]/10 py-4 px-6 border-b border-[#e6bf7a]/15">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold flex items-center">
              <List className="h-5 w-5 ml-2 text-[#c19a48]" />
              پیگیری و برنامه‌های آینده
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-600 hover:text-slate-900 hover:bg-[#e6bf7a]/10"
                aria-label="ثبت اطلاعات جدید"
              >
                <PlusCircle className="h-4 w-4 ml-1" />
                <span className="text-sm">ثبت جدید</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-[#e6bf7a]/10">
            {/* Left section - What needs to be tracked */}
            <div className="divide-y divide-[#e6bf7a]/10">
              <div className="p-4 bg-[#e6bf7a]/5">
                <h3 className="font-semibold text-slate-700 flex items-center">
                  <List className="h-4 w-4 ml-2 text-[#c19a48]" />
                  موارد نیازمند پیگیری
                </h3>
              </div>
              
              {/* Enhanced TrackingItem with visual indicators for "today" and contextual actions */}
              <EnhancedTrackingItem
                id="glucose"
                title="قند خون"
                value="۱۰۲ mg/dL"
                dueDate="امروز"
                icon={<Activity className="h-4 w-4 text-[#c19a48]" />}
                status="نیاز به اندازه‌گیری"
                isUrgent={true}
                normalRange="70-100 mg/dL"
                onAction={() => markComplete('glucose')}
                viewMode={viewMode}
              />
              <EnhancedTrackingItem
                id="bloodpressure"
                title="فشار خون"
                value="۱۲۰/۸۰ mmHg"
                dueDate="فردا"
                icon={<Heart className="h-4 w-4 text-[#c19a48]" />}
                status="نیاز به اندازه‌گیری"
                isUrgent={false}
                normalRange="90/60 تا 120/80 mmHg"
                onAction={() => markComplete('bloodpressure')}
                viewMode={viewMode}
              />
              <EnhancedTrackingItem
                id="weight"
                title="وزن"
                value="۷۸ کیلوگرم"
                dueDate="هفته آینده"
                icon={<UserRound className="h-4 w-4 text-[#c19a48]" />}
                status="نیاز به اندازه‌گیری"
                isUrgent={false}
                normalRange="BMI: 18.5-24.9"
                onAction={() => markComplete('weight')}
                viewMode={viewMode}
              />
              <EnhancedTrackingItem
                id="medication"
                title="مصرف داروها"
                value="متفورمین، آتورواستاتین"
                dueDate="روزانه"
                icon={<Pill className="h-4 w-4 text-[#c19a48]" />}
                status={`پیگیری مستمر (${medicationStreak} روز پیاپی)`}
                isUrgent={true}
                normalRange="طبق تجویز پزشک"
                onAction={() => markComplete('medication')}
                viewMode={viewMode}
                showStreak={true}
                streak={medicationStreak}
              />
            </div>
            
            {/* Right section - What needs to be done */}
            <div className="divide-y divide-[#e6bf7a]/10">
              <div className="p-4 bg-[#e6bf7a]/5">
                <h3 className="font-semibold text-slate-700 flex items-center">
                  <Calendar className="h-4 w-4 ml-2 text-[#c19a48]" />
                  برنامه‌های آینده
                </h3>
              </div>
              <EnhancedFutureTaskItem
                id="medication-task"
                title="مصرف دارو - متفورمین"
                time="امروز - ۱۸:۰۰"
                icon={<Pill className="h-4 w-4 text-[#c19a48]" />}
                type="دارو"
                priority="ضروری"
                viewMode={viewMode}
                onAction={() => markComplete('medication-task')}
                isToday={true}
              />
              <EnhancedFutureTaskItem
                id="doctor-visit"
                title="ویزیت دکتر محمدی"
                time="فردا - ۱۰:۳۰"
                icon={<UserRound className="h-4 w-4 text-[#c19a48]" />}
                type="ویزیت"
                priority="مهم"
                viewMode={viewMode}
                onAction={() => markComplete('doctor-visit')}
                isToday={false}
              />
              <EnhancedFutureTaskItem
                id="blood-test"
                title="آزمایش خون"
                time="پس‌فردا - ۸:۰۰"
                icon={<Activity className="h-4 w-4 text-[#c19a48]" />}
                type="آزمایش"
                priority="مهم"
                viewMode={viewMode}
                onAction={() => markComplete('blood-test')}
                isToday={false}
              />
              <EnhancedFutureTaskItem
                id="result-review"
                title="بررسی نتایج آزمایش"
                time="هفته آینده - ۱۵:۰۰"
                icon={<CheckCircle2 className="h-4 w-4 text-[#c19a48]" />}
                type="پیگیری"
                priority="متوسط"
                viewMode={viewMode}
                onAction={() => markComplete('result-review')}
                isToday={false}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick action floating button - mobile only */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <Button 
          size="icon" 
          className="h-12 w-12 rounded-full shadow-lg bg-[#c19a48] hover:bg-[#a17c34]" 
          aria-label="اقدامات سریع"
        >
          <PlusCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}

// Enhanced component for tracking items with better UI/UX
interface EnhancedTrackingItemProps {
  id: string;
  title: string;
  value: string;
  dueDate: string;
  icon: React.ReactNode;
  status: string;
  isUrgent: boolean;
  normalRange: string;
  onAction: () => void;
  viewMode: 'detailed' | 'compact';
  showStreak?: boolean;
  streak?: number;
}

function EnhancedTrackingItem({ 
  id, title, value, dueDate, icon, status, isUrgent, normalRange, onAction, viewMode, showStreak, streak 
}: EnhancedTrackingItemProps) {
  // Pulse animation for urgent items
  const urgentStyle = isUrgent 
    ? viewMode === 'detailed' 
      ? 'border-r-4 border-r-red-400 animate-pulse bg-red-50/30' 
      : 'border-r-4 border-r-red-400'
    : '';
  
  return (
    <div className={`flex items-center justify-between p-4 hover:bg-[#e6bf7a]/5 transition-colors ${urgentStyle}`}>
      <div className="flex items-center gap-3">
        <div className="bg-[#e6bf7a]/15 p-2 rounded-full">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-slate-800">{title}</h3>
            {showStreak && streak && streak > 5 && (
              <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                🔥 {streak} روز
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-600">{value}</p>
          {viewMode === 'detailed' && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 mt-1 cursor-help">
                    <Info className="h-3 w-3 text-slate-400" />
                    <p className="text-xs text-slate-500">{status}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>محدوده نرمال: {normalRange}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      <div className="text-left flex items-center gap-2">
        <div>
          <Badge className="bg-[#e6bf7a]/20 text-[#c19a48] border-[#e6bf7a]/30 mb-1">
            {dueDate}
          </Badge>
          {viewMode === 'compact' && (
            <p className="text-xs text-slate-500 text-left">{status}</p>
          )}
        </div>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-8 w-8 rounded-full text-slate-500 hover:bg-[#e6bf7a]/20 hover:text-[#c19a48]"
          onClick={onAction}
          aria-label="ثبت اندازه‌گیری"
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Enhanced component for future tasks with better UI/UX
interface EnhancedFutureTaskItemProps {
  id: string;
  title: string;
  time: string;
  icon: React.ReactNode;
  type: string;
  priority: string;
  viewMode: 'detailed' | 'compact';
  onAction: () => void;
  isToday: boolean;
}

function EnhancedFutureTaskItem({ 
  id, title, time, icon, type, priority, viewMode, onAction, isToday 
}: EnhancedFutureTaskItemProps) {
  // Determine badge color based on priority
  const priorityColorMap: Record<string, string> = {
    'ضروری': 'bg-red-100 text-red-600 border-red-200',
    'مهم': 'bg-amber-100 text-amber-600 border-amber-200',
    'متوسط': 'bg-blue-100 text-blue-600 border-blue-200',
    'عادی': 'bg-green-100 text-green-600 border-green-200'
  };
  
  const badgeClassName = priorityColorMap[priority] || 'bg-gray-100 text-gray-600 border-gray-200';
  
  // Today items get special treatment
  const todayStyle = isToday 
    ? viewMode === 'detailed' 
      ? 'border-r-4 border-r-amber-400 bg-amber-50/30' 
      : 'border-r-4 border-r-amber-400'
    : '';

  return (
    <div className={`flex items-center justify-between p-4 hover:bg-[#e6bf7a]/5 transition-colors ${todayStyle}`}>
      <div className="flex items-center gap-3">
        <div className="bg-[#e6bf7a]/15 p-2 rounded-full">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-slate-800">{title}</h3>
          <div className="flex items-center text-sm text-slate-600 gap-2 mt-1">
            <Clock className="h-3 w-3" />
            <span>{time}</span>
          </div>
        </div>
      </div>
      <div className="text-left flex items-center gap-2">
        <div>
          <Badge className={`${badgeClassName} mb-1`}>
            {priority}
          </Badge>
          {viewMode === 'detailed' && (
            <p className="text-xs text-slate-500 text-left">{type}</p>
          )}
        </div>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-8 w-8 rounded-full text-slate-500 hover:bg-green-100 hover:text-green-600"
          onClick={onAction}
          aria-label="انجام شد"
        >
          <CheckCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 