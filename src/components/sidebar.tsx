"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, Stethoscope, Bell, TestTube, Utensils,
  LayoutDashboard, Settings, Menu, X
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: "داشبورد",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "اطلاعات پایه",
    href: "/dashboard/basic-info",
    icon: User,
  },
  {
    title: "اطلاعات پزشکی",
    href: "/dashboard/medical-info",
    icon: Stethoscope,
  },
  {
    title: "یادآوری‌ها",
    href: "/dashboard/reminders",
    icon: Bell,
  },
  {
    title: "داده‌های آزمایشگاهی",
    href: "/dashboard/lab-data",
    icon: TestTube,
  },
  {
    title: "رژیم غذایی",
    href: "/dashboard/diet",
    icon: Utensils,
  },
  {
    title: "تنظیمات",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 left-4 z-40"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">منو</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-0 pr-0">
          <div className="flex h-full flex-col border-l border-gray-200 bg-white">
            <div className="flex items-center p-4 border-b border-gray-200">
              <h2 className="font-bold text-xl">پزشک یار هوشمند</h2>
              <Button
                variant="ghost"
                size="icon"
                className="mr-auto"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">بستن</span>
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <nav className="grid gap-1 px-2 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 transition-colors",
                      pathname === item.href && "bg-gray-100 text-gray-900 font-medium",
                      pathname !== item.href && "hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <item.icon className="h-5 w-5 ml-2" />
                    {item.title}
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-screen border-r border-border flex-col w-64 bg-white sticky top-0">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h1 className="font-bold text-lg">پزشک یار هوشمند</h1>
        </div>
        <ScrollArea className="flex-1">
          <nav className="grid gap-1 px-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 transition-colors",
                  pathname === item.href && "bg-gray-100 text-gray-900 font-medium",
                  pathname !== item.href && "hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="h-5 w-5 ml-2" />
                {item.title}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            نسخه ۱.۰.۰
          </p>
        </div>
      </div>
    </>
  );
} 