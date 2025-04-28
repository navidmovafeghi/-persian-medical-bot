"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DietForm } from "@/components/forms/diet-form";
import { MedicalForm } from "@/components/forms/medical-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Define types based on the forms
type Food = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: number;
  unit: string;
};

type MealEntry = {
  mealType: string;
  foods: Food[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
};

type MedicalFormValues = {
  height: string;
  weight: string;
  age: string;
  gender: "male" | "female" | "other";
  hasConditions: boolean;
  conditions?: string[];
  takingMedications: boolean;
  medications?: string;
  hasDietRestrictions: boolean;
  dietRestrictions?: string[];
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "veryActive";
  healthGoals: string[];
};

export default function FoodDiaryPage() {
  const [entries, setEntries] = useState<MealEntry[]>([]);
  
  const handleDietSubmit = (data: MealEntry) => {
    setEntries(prev => [...prev, data]);
    console.log("Diet form submitted:", data);
  };
  
  const handleMedicalSubmit = (data: MedicalFormValues) => {
    console.log("Medical form submitted:", data);
    // Store medical data or use it for recommendations
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">دفترچه ثبت غذایی</h1>
      
      <Tabs defaultValue="diary" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="diary">ثبت وعده غذایی</TabsTrigger>
          <TabsTrigger value="medical">اطلاعات پزشکی</TabsTrigger>
        </TabsList>
        
        <TabsContent value="diary">
          <Card>
            <CardHeader>
              <CardTitle>ثبت وعده غذایی</CardTitle>
              <CardDescription>
                لطفاً وعده‌های غذایی خود را در این قسمت ثبت کنید.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DietForm onSubmit={handleDietSubmit} />
              
              {entries.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">وعده‌های ثبت شده</h3>
                  <div className="space-y-4">
                    {entries.map((entry, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">
                            {entry.mealType === "breakfast" ? "صبحانه" : 
                             entry.mealType === "lunch" ? "ناهار" : 
                             entry.mealType === "dinner" ? "شام" : "میان‌وعده"}
                          </h4>
                          <span className="text-sm text-gray-500">{entry.totalCalories} کالری</span>
                        </div>
                        <p className="mt-2">
                          {entry.foods.map(food => `${food.name} (${food.quantity} ${food.unit})`).join(', ')}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات پزشکی</CardTitle>
              <CardDescription>
                اطلاعات پزشکی خود را وارد کنید تا توصیه‌های بهتری برای شما ارائه دهیم.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MedicalForm onSubmit={handleMedicalSubmit} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 