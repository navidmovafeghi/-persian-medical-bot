"use client";

import { useState } from "react";
import { MedicalForm } from "@/components/forms/medical-form";
import { DietForm } from "@/components/forms/diet-form";
import { HealthVisualizations } from "@/components/dashboard/health-visualizations";
import { HealthRecommendations } from "@/components/dashboard/health-recommendations";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Utensils, Activity, ChevronRight, PlusCircle } from "lucide-react";

type AppState = "onboarding" | "tracking";
type OnboardingStep = "medical" | "diet" | "complete";

export default function HealthTrackerPage() {
  const [appState, setAppState] = useState<AppState>("onboarding");
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("medical");
  const [formData, setFormData] = useState({
    medical: null,
    diet: null,
  });
  
  // Handle medical form submission
  const handleMedicalSubmit = (data: any) => {
    setFormData({ ...formData, medical: data });
    setOnboardingStep("diet");
  };
  
  // Handle diet form submission
  const handleDietSubmit = (data: any) => {
    setFormData({ ...formData, diet: data });
    setOnboardingStep("complete");
  };
  
  // Complete onboarding
  const completeOnboarding = () => {
    setAppState("tracking");
  };
  
  // Restart onboarding
  const restartOnboarding = () => {
    setAppState("onboarding");
    setOnboardingStep("medical");
  };
  
  // Render onboarding flow
  if (appState === "onboarding") {
    return (
      <div className="container max-w-5xl px-4 py-8 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">ردیاب سلامتی هوشمند</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            به ردیاب سلامتی هوشمند خوش آمدید. لطفاً اطلاعات زیر را تکمیل کنید تا بتوانیم توصیه‌های شخصی‌سازی شده برای بهبود سلامتی شما ارائه دهیم.
          </p>
        </div>
        
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                onboardingStep === "medical" || onboardingStep === "diet" || onboardingStep === "complete"
                  ? "bg-[#c19a48] text-white"
                  : "bg-slate-200 text-slate-500"
              }`}>
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1 text-slate-600">اطلاعات پزشکی</span>
            </div>
            
            <div className="w-16 h-1 bg-slate-200">
              <div className={`h-full bg-[#c19a48] transform transition-all duration-300 ${
                onboardingStep === "diet" || onboardingStep === "complete" ? "w-full" : "w-0"
              }`} />
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                onboardingStep === "diet" || onboardingStep === "complete"
                  ? "bg-[#c19a48] text-white"
                  : "bg-slate-200 text-slate-500"
              }`}>
                <Utensils className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1 text-slate-600">رژیم غذایی</span>
            </div>
            
            <div className="w-16 h-1 bg-slate-200">
              <div className={`h-full bg-[#c19a48] transform transition-all duration-300 ${
                onboardingStep === "complete" ? "w-full" : "w-0"
              }`} />
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                onboardingStep === "complete"
                  ? "bg-[#c19a48] text-white"
                  : "bg-slate-200 text-slate-500"
              }`}>
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1 text-slate-600">تکمیل</span>
            </div>
          </div>
        </div>
        
        {/* Forms */}
        <div className="mt-8">
          {onboardingStep === "medical" && (
            <MedicalForm onSubmit={handleMedicalSubmit} />
          )}
          
          {onboardingStep === "diet" && (
            <DietForm onSubmit={handleDietSubmit} />
          )}
          
          {onboardingStep === "complete" && (
            <div className="bg-white rounded-lg border border-slate-200 p-8 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-800 mb-2">اطلاعات شما با موفقیت ثبت شد!</h2>
              <p className="text-slate-600 mb-6">
                بر اساس اطلاعاتی که وارد کرده‌اید، توصیه‌های شخصی‌سازی شده برای بهبود سلامتی شما آماده شده است.
              </p>
              
              <Button
                className="bg-[#c19a48] hover:bg-[#a17c34] mt-4"
                onClick={completeOnboarding}
              >
                ورود به داشبورد سلامتی
                <ChevronRight className="h-4 w-4 mr-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Main health tracking dashboard
  return (
    <div className="container max-w-6xl px-4 py-6 mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">داشبورد سلامتی</h1>
          <p className="text-slate-600">وضعیت سلامتی خود را مدیریت کنید و تغییرات را پیگیری نمایید</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={restartOnboarding}
            className="text-slate-600"
          >
            ویرایش اطلاعات اولیه
          </Button>
          
          <Button
            size="sm"
            className="bg-[#c19a48] hover:bg-[#a17c34]"
          >
            <PlusCircle className="h-4 w-4 ml-1" />
            ثبت اندازه‌گیری جدید
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="mb-6 bg-slate-100 p-1 rounded-lg">
          <TabsTrigger value="summary" className="rounded-md data-[state=active]:bg-white">
            خلاصه وضعیت
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="rounded-md data-[state=active]:bg-white">
            توصیه‌ها
          </TabsTrigger>
          <TabsTrigger value="diet" className="rounded-md data-[state=active]:bg-white">
            رژیم غذایی
          </TabsTrigger>
          <TabsTrigger value="track" className="rounded-md data-[state=active]:bg-white">
            ثبت اطلاعات جدید
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <HealthVisualizations />
        </TabsContent>
        
        <TabsContent value="recommendations">
          <HealthRecommendations />
        </TabsContent>
        
        <TabsContent value="diet">
          <DietForm />
        </TabsContent>
        
        <TabsContent value="track">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-4 aspect-square">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">ثبت اندازه‌گیری</h3>
              <p className="text-sm text-slate-600 text-center">
                وزن، قند خون، فشار خون و سایر شاخص‌های سلامتی خود را ثبت کنید
              </p>
              <Button variant="outline" className="mt-2">
                شروع اندازه‌گیری
              </Button>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-4 aspect-square">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <Utensils className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">ثبت رژیم غذایی</h3>
              <p className="text-sm text-slate-600 text-center">
                وعده‌های غذایی خود را ثبت کنید و تناسب آن را با اهداف سلامتی خود بررسی کنید
              </p>
              <Button variant="outline" className="mt-2">
                ثبت وعده غذایی
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 