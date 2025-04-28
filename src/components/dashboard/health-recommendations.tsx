"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Activity, 
  Utensils, 
  Brain, 
  Moon, 
  Droplets, 
  Check, 
  ArrowRight, 
  ThumbsUp, 
  BookOpen 
} from "lucide-react";

// Sample recommendations data
const recommendationsData = {
  daily: [
    {
      id: "drink-water",
      category: "nutrition",
      title: "افزایش مصرف آب",
      description: "امروز حداقل ۸ لیوان آب بنوشید تا به هدف روزانه خود برسید.",
      actionText: "نوشیدن یک لیوان آب",
      priority: "high",
      icon: <Droplets className="h-5 w-5 text-blue-500" />,
      completable: true,
      completed: false,
    },
    {
      id: "take-medication",
      category: "medication",
      title: "مصرف داروها",
      description: "متفورمین را بعد از صبحانه و شام مصرف کنید.",
      actionText: "مصرف دارو",
      priority: "high",
      icon: <Activity className="h-5 w-5 text-red-500" />,
      completable: true,
      completed: false,
    },
    {
      id: "walk",
      category: "activity",
      title: "پیاده‌روی",
      description: "امروز ۳۰ دقیقه پیاده‌روی کنید تا به قدم روزانه خود برسید.",
      actionText: "انجام پیاده‌روی",
      priority: "medium",
      icon: <Activity className="h-5 w-5 text-green-500" />,
      completable: true,
      completed: false,
    },
  ],
  weekly: [
    {
      id: "reduce-carbs",
      category: "nutrition",
      title: "کاهش کربوهیدرات",
      description: "مصرف کربوهیدرات خود را به میزان ۲۰٪ کاهش دهید تا قند خون بهتری داشته باشید.",
      actionText: "بیشتر بدانید",
      priority: "medium",
      icon: <Utensils className="h-5 w-5 text-amber-500" />,
      completable: false,
    },
    {
      id: "sleep-improvement",
      category: "lifestyle",
      title: "بهبود کیفیت خواب",
      description: "زمان خواب منظمی داشته باشید و قبل از خواب از استفاده از صفحه نمایش خودداری کنید.",
      actionText: "ثبت خواب",
      priority: "medium",
      icon: <Moon className="h-5 w-5 text-indigo-500" />,
      completable: false,
    },
  ],
  longterm: [
    {
      id: "weight-goal",
      category: "goals",
      title: "کاهش وزن تدریجی",
      description: "طبق برنامه کنونی، شما می‌توانید تا ۳ ماه آینده به وزن ایده‌آل خود برسید.",
      actionText: "مشاهده برنامه",
      priority: "low",
      icon: <Heart className="h-5 w-5 text-pink-500" />,
      completable: false,
    },
    {
      id: "stress-management",
      category: "mental",
      title: "مدیریت استرس",
      description: "با انجام تمرینات منظم مدیتیشن و تنفس عمیق، استرس خود را کاهش دهید.",
      actionText: "یادگیری تکنیک‌ها",
      priority: "low",
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      completable: false,
    },
  ],
  educational: [
    {
      id: "diabetes-101",
      category: "education",
      title: "آشنایی با دیابت نوع ۲",
      description: "با مطالعه این مقاله، اطلاعات بیشتری در مورد مدیریت دیابت نوع ۲ کسب کنید.",
      actionText: "مطالعه مقاله",
      priority: "medium",
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      completable: false,
    },
    {
      id: "heart-health",
      category: "education",
      title: "سلامت قلب",
      description: "با این نکات ساده، سلامت قلب خود را بهبود ببخشید.",
      actionText: "مطالعه نکات",
      priority: "low",
      icon: <Heart className="h-5 w-5 text-red-500" />,
      completable: false,
    },
  ],
};

type RecommendationCategory = keyof typeof recommendationsData;

export function HealthRecommendations() {
  const [activeCategory, setActiveCategory] = useState<RecommendationCategory>("daily");
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  
  // Get the appropriate list of recommendations
  const recommendationsList = recommendationsData[activeCategory];
  
  // Toggle completed status of a recommendation
  const toggleCompleted = (id: string) => {
    if (completedItems.includes(id)) {
      setCompletedItems(completedItems.filter(itemId => itemId !== id));
    } else {
      setCompletedItems([...completedItems, id]);
    }
  };
  
  // Get priority badge style
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };
  
  // Get priority text
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "اولویت بالا";
      case "medium":
        return "اولویت متوسط";
      case "low":
        return "اولویت عادی";
      default:
        return priority;
    }
  };
  
  // Get category text
  const getCategoryText = (category: string) => {
    switch (category) {
      case "nutrition":
        return "تغذیه";
      case "activity":
        return "فعالیت";
      case "medication":
        return "دارو";
      case "lifestyle":
        return "سبک زندگی";
      case "goals":
        return "اهداف";
      case "mental":
        return "سلامت روان";
      case "education":
        return "آموزش";
      default:
        return category;
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">توصیه‌های سلامتی</CardTitle>
        <CardDescription>
          توصیه‌های شخصی‌سازی شده بر اساس وضعیت سلامتی شما
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="daily" value={activeCategory} onValueChange={(value) => setActiveCategory(value as RecommendationCategory)}>
        <div className="px-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="daily">روزانه</TabsTrigger>
            <TabsTrigger value="weekly">هفتگی</TabsTrigger>
            <TabsTrigger value="longterm">بلندمدت</TabsTrigger>
            <TabsTrigger value="educational">آموزشی</TabsTrigger>
          </TabsList>
        </div>
        
        {Object.keys(recommendationsData).map((category) => (
          <TabsContent key={category} value={category}>
            <CardContent className="space-y-4 pt-2">
              {recommendationsData[category as RecommendationCategory].length > 0 ? (
                recommendationsData[category as RecommendationCategory].map((recommendation) => (
                  <div 
                    key={recommendation.id}
                    className={`border rounded-md p-4 transition-colors ${
                      completedItems.includes(recommendation.id) 
                        ? "bg-green-50 border-green-200" 
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        completedItems.includes(recommendation.id) 
                          ? "bg-green-100" 
                          : "bg-slate-100"
                      }`}>
                        {completedItems.includes(recommendation.id) 
                          ? <Check className="h-5 w-5 text-green-600" /> 
                          : recommendation.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-medium ${
                              completedItems.includes(recommendation.id) 
                                ? "line-through text-slate-500" 
                                : ""
                            }`}>
                              {recommendation.title}
                            </h3>
                            <Badge variant="outline" className="bg-slate-50">
                              {getCategoryText(recommendation.category)}
                            </Badge>
                          </div>
                          
                          <Badge
                            className={getPriorityStyle(recommendation.priority)}
                          >
                            {getPriorityText(recommendation.priority)}
                          </Badge>
                        </div>
                        
                        <p className={`text-sm mt-2 ${
                          completedItems.includes(recommendation.id) 
                            ? "text-slate-500" 
                            : "text-slate-600"
                        }`}>
                          {recommendation.description}
                        </p>
                        
                        <div className="mt-3 flex justify-end">
                          {recommendation.completable ? (
                            <Button
                              variant={completedItems.includes(recommendation.id) ? "outline" : "default"}
                              size="sm"
                              className={completedItems.includes(recommendation.id) 
                                ? "border-green-200 text-green-700" 
                                : "bg-[#c19a48] hover:bg-[#a17c34]"
                              }
                              onClick={() => toggleCompleted(recommendation.id)}
                            >
                              {completedItems.includes(recommendation.id) 
                                ? <><ThumbsUp className="h-4 w-4 mr-1" /> انجام شد</>
                                : recommendation.actionText}
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[#c19a48]"
                            >
                              {recommendation.actionText}
                              <ArrowRight className="h-4 w-4 mr-1" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <p>برای این دسته توصیه‌ای وجود ندارد.</p>
                </div>
              )}
            </CardContent>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
} 