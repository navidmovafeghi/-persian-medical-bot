"use client";

import { 
  ArrowDown, 
  BarChart3, 
  Activity, 
  Heart, 
  Calendar, 
  Pill, 
  Droplets, 
  UserRound,
  Clock,
  TrendingUp,
  ChevronLeft,
  BarChart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const today = new Date();
  const persianDate = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(today);

  return (
    <div className="space-y-6">
      {/* Hero section - changed from gradient to solid color */}
      <div className="bg-[#0096c7]/10 rounded-lg p-6 flex flex-col md:flex-row items-center md:justify-between gap-4 border border-[#0096c7]/20 shadow-sm">
        <div className="flex items-center gap-5">
          <Avatar className="w-16 h-16 border-4 border-white shadow-sm hidden md:flex">
            <AvatarImage src="/placeholder-avatar.jpg" alt="علی" />
            <AvatarFallback className="text-xl bg-[#0096c7]/20 text-slate-600">ع</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-800">سلام، علی!</h1>
              <Badge variant="secondary" className="bg-[#0096c7]/15 text-[#0096c7] hover:bg-[#0096c7]/25 hidden md:flex">
                <Activity className="w-3 h-3 ml-1 text-[#0096c7]" />وضعیت: خوب
              </Badge>
            </div>
            <p className="text-slate-600 mt-1 text-sm">{persianDate}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="secondary" className="bg-[#0096c7]/15 text-[#0096c7] hover:bg-[#0096c7]/25 md:hidden">
                <Activity className="w-3 h-3 ml-1 text-[#0096c7]" />وضعیت: خوب
              </Badge>
              <Badge variant="secondary" className="bg-[#0096c7]/15 text-[#0096c7] hover:bg-[#0096c7]/25">
                <Calendar className="w-3 h-3 ml-1 text-[#0096c7]" />۳ یادآوری امروز
              </Badge>
              <Badge variant="secondary" className="bg-[#0096c7]/15 text-[#0096c7] hover:bg-[#0096c7]/25">
                <Pill className="w-3 h-3 ml-1 text-[#0096c7]" />۲ دارو
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 bg-white p-3 rounded-lg border border-[#0096c7]/20 shadow-sm min-w-24">
          <div className="text-center">
            <div className="font-semibold text-lg text-[#0096c7]">۷۵٪</div>
            <div className="text-xs text-slate-500">پیشرفت درمان</div>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#0096c7]" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Left column - Stats and Chart */}
        <div className="lg:col-span-4 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="نسخه‌های جدید"
              value="۳"
              icon={<Pill className="h-4 w-4 text-[#0096c7]" />}
              trend={<>
                <ArrowDown className="h-3 w-3 ml-1 text-red-600" />
                <span>۲-</span>
              </>}
            />
            <StatCard
              title="شاخص توده بدنی"
              value="۲۲.۴"
              icon={<UserRound className="h-4 w-4 text-[#0096c7]" />}
              badge="نرمال"
            />
            <StatCard
              title="فشار خون"
              value="۱۲۰/۸۰"
              icon={<Heart className="h-4 w-4 text-[#0096c7]" />}
              badge="طبیعی"
            />
            <StatCard
              title="قند خون"
              value="۱۰۲"
              icon={<Activity className="h-4 w-4 text-[#0096c7]" />}
              badge="نرمال"
            />
          </div>

          {/* Chart Section - update card header to solid color */}
          <Card className="border border-slate-200 rounded-md shadow-sm overflow-hidden">
            <CardHeader className="bg-[#0096c7]/10 border-b border-[#0096c7]/15 py-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-base flex items-center">
                    <BarChart className="h-4 w-4 ml-1.5 text-[#0096c7]" />
                    شاخص‌های سلامت در ۳ ماه گذشته
                  </CardTitle>
                </div>
                <div className="flex gap-1.5">
                  <Badge variant="outline" className="bg-[#0096c7]/5 border-[#0096c7]/20 text-[#0096c7] text-xs">قند خون</Badge>
                  <Badge variant="outline" className="bg-[#0096c7]/5 border-[#0096c7]/20 text-[#0096c7] text-xs">فشار خون</Badge>
                  <Badge variant="outline" className="bg-[#0096c7]/5 border-[#0096c7]/20 text-[#0096c7] text-xs">وزن</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[250px] bg-white flex items-center justify-center p-6">
                <div className="text-center space-y-3">
                  <div className="w-full h-40 bg-[#0096c7]/5 rounded-md flex items-center justify-center">
                    <BarChart3 className="h-10 w-10 text-[#0096c7]/40" />
                  </div>
                  <p className="text-slate-600 text-sm">نمودار روند شاخص‌های سلامت در اینجا نمایش داده می‌شود</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-[#0096c7]/10 py-2 text-xs text-slate-500 justify-between border-t border-[#0096c7]/15 flex-wrap">
              <span>آخرین به‌روزرسانی: دیروز ساعت ۱۸:۳۰</span>
              <button className="text-[#0096c7] hover:text-[#0077b6] transition-colors flex items-center">
                مشاهده جزئیات
                <ChevronLeft className="h-3 w-3 mr-1" />
              </button>
            </CardFooter>
          </Card>
        </div>

        {/* Right column - Reminders and Health Tips in sidebar */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule Card - update card header to solid color */}
          <Card className="border border-slate-200 rounded-md shadow-sm">
            <CardHeader className="bg-[#0096c7]/10 border-b border-[#0096c7]/15 py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base flex items-center">
                  <Clock className="h-4 w-4 ml-1.5 text-[#0096c7]" />
                  برنامه امروز
                </CardTitle>
                <Badge className="bg-[#0096c7]/15 text-[#0096c7] text-xs">۳ مورد</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#0096c7]/10">
                <ScheduleItem 
                  title="مصرف دارو - متفورمین"
                  time="۱۸:۰۰"
                  icon={<Pill className="h-4 w-4 text-[#0096c7]" />}
                  type="دارو"
                />
                <ScheduleItem 
                  title="ویزیت دکتر محمدی"
                  time="فردا - ۱۰:۳۰"
                  icon={<UserRound className="h-4 w-4 text-[#0096c7]" />}
                  type="ویزیت"
                />
                <ScheduleItem 
                  title="آزمایش خون"
                  time="پس‌فردا - ۸:۰۰"
                  icon={<Activity className="h-4 w-4 text-[#0096c7]" />}
                  type="آزمایش"
                />
              </div>
            </CardContent>
            <CardFooter className="bg-[#0096c7]/10 py-2 border-t border-[#0096c7]/15 flex justify-center">
              <button className="text-[#0096c7] text-xs font-medium hover:text-[#0077b6] transition-colors flex items-center">
                مشاهده تقویم کامل
                <ChevronLeft className="h-3 w-3 mr-1" />
              </button>
            </CardFooter>
          </Card>

          {/* Health Tips Card - update card header to solid color */}
          <Card className="border border-slate-200 rounded-md shadow-sm">
            <CardHeader className="bg-[#0096c7]/10 border-b border-[#0096c7]/15 py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base flex items-center">
                  <Heart className="h-4 w-4 ml-1.5 text-[#0096c7]" />
                  توصیه‌های سلامتی
                </CardTitle>
                <Badge className="bg-[#0096c7]/15 text-[#0096c7] text-xs">مخصوص شما</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#0096c7]/10">
                <HealthTip
                  title="افزایش فعالیت فیزیکی"
                  description="حداقل ۳۰ دقیقه پیاده‌روی روزانه"
                  icon={<Activity className="h-4 w-4 text-[#0096c7]" />}
                />
                <HealthTip
                  title="کاهش مصرف نمک"
                  description="برای کنترل فشار خون"
                  icon={<Heart className="h-4 w-4 text-[#0096c7]" />}
                />
                <HealthTip
                  title="افزایش مصرف آب"
                  description="حداقل ۸ لیوان در روز"
                  icon={<Droplets className="h-4 w-4 text-[#0096c7]" />}
                />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities Card - update card header to solid color */}
          <Card className="border border-slate-200 rounded-md shadow-sm">
            <CardHeader className="bg-[#0096c7]/10 border-b border-[#0096c7]/15 py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base flex items-center">
                  <TrendingUp className="h-4 w-4 ml-1.5 text-[#0096c7]" />
                  فعالیت‌های اخیر
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-3">
                <ActivityItem 
                  title="آخرین ویزیت پزشک"
                  date="۲ هفته پیش"
                  value="دکتر احمدی"
                />
                <ActivityItem 
                  title="آخرین آزمایش خون"
                  date="۱ ماه پیش"
                  value="قند خون: نرمال"
                />
                <ActivityItem 
                  title="آخرین اندازه‌گیری فشار خون"
                  date="۲ روز پیش"
                  value="۱۲۰/۸۰"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Statistic Card Component
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: React.ReactNode;
  badge?: string;
}

function StatCard({ title, value, icon, trend, badge }: StatCardProps) {
  return (
    <Card className="border border-slate-200 bg-white rounded-md shadow-sm overflow-hidden">
      <CardHeader className="!bg-[#0096c7]/10 !py-2 !px-3 border-b border-[#0096c7]/15 !m-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xs font-medium text-slate-700 flex items-center">
            {title}
          </CardTitle>
          <div className="h-6 w-6 rounded-full bg-[#0096c7]/10 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="text-lg font-bold text-slate-800">{value}</div>
        <div className="mt-1.5">
          {trend && (
            <p className="text-xs text-slate-600 font-medium flex items-center">
              {trend}
            </p>
          )}
          {badge && (
            <Badge className="bg-[#0096c7]/10 hover:bg-[#0096c7]/20 text-[#0096c7] text-xs">
              {badge}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Schedule Item Component
interface ScheduleItemProps {
  title: string;
  time: string;
  icon: React.ReactNode;
  type: string;
}

function ScheduleItem({ title, time, icon, type }: ScheduleItemProps) {
  return (
    <div className="p-3 hover:bg-[#0096c7]/5 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#0096c7]/10 flex items-center justify-center ml-2">
            {icon}
          </div>
          <div>
            <p className="font-medium text-sm">{title}</p>
            <p className="text-xs text-slate-500">{time}</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-[#0096c7]/5 border-[#0096c7]/20 text-[#0096c7] text-xs">
          {type}
        </Badge>
      </div>
    </div>
  );
}

// Health Tip Component
interface HealthTipProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function HealthTip({ title, description, icon }: HealthTipProps) {
  return (
    <div className="p-3 hover:bg-[#0096c7]/5 transition-colors">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-[#0096c7]/10 flex items-center justify-center ml-2">
          {icon}
        </div>
        <div>
          <p className="font-medium text-sm">{title}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Activity Item Component
interface ActivityItemProps {
  title: string;
  date: string;
  value: string;
}

function ActivityItem({ title, date, value }: ActivityItemProps) {
  return (
    <div className="bg-[#0096c7]/5 rounded-md p-2">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-xs font-medium">{title}</h4>
          <p className="text-xs text-slate-500 mt-0.5">{date}</p>
        </div>
        <Badge className="bg-white text-[#0096c7] text-xs border border-[#0096c7]/20">
          {value}
        </Badge>
      </div>
    </div>
  );
} 