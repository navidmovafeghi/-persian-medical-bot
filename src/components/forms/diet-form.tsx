"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Search, X, Info } from "lucide-react";

// Sample food database by category
const foodDatabase = {
  proteins: [
    { id: "chicken", name: "مرغ", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { id: "beef", name: "گوشت گاو", calories: 250, protein: 26, carbs: 0, fat: 17 },
    { id: "fish", name: "ماهی", calories: 206, protein: 22, carbs: 0, fat: 12 },
    { id: "eggs", name: "تخم مرغ", calories: 78, protein: 6, carbs: 0.6, fat: 5 },
    { id: "tofu", name: "توفو", calories: 76, protein: 8, carbs: 2, fat: 4 },
  ],
  carbs: [
    { id: "rice", name: "برنج", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
    { id: "bread", name: "نان", calories: 265, protein: 9, carbs: 49, fat: 3.2 },
    { id: "potato", name: "سیب زمینی", calories: 77, protein: 2, carbs: 17, fat: 0.1 },
    { id: "pasta", name: "پاستا", calories: 131, protein: 5, carbs: 25, fat: 1.1 },
  ],
  vegetables: [
    { id: "tomato", name: "گوجه فرنگی", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
    { id: "cucumber", name: "خیار", calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1 },
    { id: "lettuce", name: "کاهو", calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2 },
    { id: "carrot", name: "هویج", calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2 },
  ],
  fruits: [
    { id: "apple", name: "سیب", calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
    { id: "banana", name: "موز", calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    { id: "orange", name: "پرتقال", calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
    { id: "grapes", name: "انگور", calories: 67, protein: 0.6, carbs: 17, fat: 0.4 },
  ],
  dairy: [
    { id: "milk", name: "شیر", calories: 42, protein: 3.4, carbs: 5, fat: 1 },
    { id: "yogurt", name: "ماست", calories: 59, protein: 3.5, carbs: 5, fat: 3.1 },
    { id: "cheese", name: "پنیر", calories: 402, protein: 25, carbs: 1.3, fat: 33 },
  ],
  snacks: [
    { id: "nuts", name: "آجیل", calories: 607, protein: 21, carbs: 20, fat: 54 },
    { id: "chocolate", name: "شکلات", calories: 546, protein: 4.9, carbs: 61, fat: 31 },
    { id: "chips", name: "چیپس", calories: 536, protein: 7, carbs: 53, fat: 35 },
  ],
  beverages: [
    { id: "water", name: "آب", calories: 0, protein: 0, carbs: 0, fat: 0 },
    { id: "tea", name: "چای", calories: 2, protein: 0, carbs: 0.5, fat: 0 },
    { id: "coffee", name: "قهوه", calories: 2, protein: 0.1, carbs: 0, fat: 0 },
    { id: "juice", name: "آب میوه", calories: 45, protein: 0.5, carbs: 11, fat: 0.1 },
  ],
};

// Food categories in Persian
const foodCategories = [
  { id: "proteins", name: "پروتئین‌ها" },
  { id: "carbs", name: "کربوهیدرات‌ها" },
  { id: "vegetables", name: "سبزیجات" },
  { id: "fruits", name: "میوه‌ها" },
  { id: "dairy", name: "لبنیات" },
  { id: "snacks", name: "میان‌وعده‌ها" },
  { id: "beverages", name: "نوشیدنی‌ها" },
];

// Meal types
const mealTypes = [
  { id: "breakfast", name: "صبحانه" },
  { id: "lunch", name: "ناهار" },
  { id: "dinner", name: "شام" },
  { id: "snack", name: "میان‌وعده" },
];

type Food = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity?: number;
  unit?: string;
};

type MealEntry = {
  mealType: string;
  foods: (Food & { quantity: number; unit: string })[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
};

interface DietFormProps {
  onSubmit?: (data: MealEntry) => void;
}

export function DietForm({ onSubmit }: DietFormProps) {
  const [activeTab, setActiveTab] = useState("add");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState("breakfast");
  const [selectedFoods, setSelectedFoods] = useState<(Food & { quantity: number; unit: string })[]>([]);
  const [mealEntries, setMealEntries] = useState<MealEntry[]>([]);
  
  // Filter foods based on search query and category
  const filteredFoods = selectedCategory 
    ? Object.entries(foodDatabase)
        .filter(([category]) => category === selectedCategory)
        .flatMap(([_, foods]) => foods)
        .filter(food => food.name.includes(searchQuery))
    : Object.values(foodDatabase)
        .flat()
        .filter(food => food.name.includes(searchQuery));
  
  // Add food to selected foods
  const addFood = (food: Food) => {
    setSelectedFoods([...selectedFoods, { ...food, quantity: 100, unit: "گرم" }]);
  };
  
  // Remove food from selected foods
  const removeFood = (foodId: string) => {
    setSelectedFoods(selectedFoods.filter(food => food.id !== foodId));
  };
  
  // Update food quantity
  const updateFoodQuantity = (foodId: string, quantity: number) => {
    setSelectedFoods(
      selectedFoods.map(food => 
        food.id === foodId ? { ...food, quantity } : food
      )
    );
  };
  
  // Update food unit
  const updateFoodUnit = (foodId: string, unit: string) => {
    setSelectedFoods(
      selectedFoods.map(food => 
        food.id === foodId ? { ...food, unit } : food
      )
    );
  };
  
  // Calculate totals
  const calculateTotals = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    
    selectedFoods.forEach(food => {
      const multiplier = food.quantity / 100; // Assuming base values are per 100g
      totalCalories += food.calories * multiplier;
      totalProtein += food.protein * multiplier;
      totalCarbs += food.carbs * multiplier;
      totalFat += food.fat * multiplier;
    });
    
    return {
      totalCalories: Math.round(totalCalories),
      totalProtein: Math.round(totalProtein * 10) / 10,
      totalCarbs: Math.round(totalCarbs * 10) / 10,
      totalFat: Math.round(totalFat * 10) / 10,
    };
  };
  
  // Save meal entry
  const saveMealEntry = () => {
    if (selectedFoods.length === 0) return;
    
    const { totalCalories, totalProtein, totalCarbs, totalFat } = calculateTotals();
    
    const newMealEntry: MealEntry = {
      mealType: selectedMealType,
      foods: [...selectedFoods],
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
    };
    
    setMealEntries([...mealEntries, newMealEntry]);
    setSelectedFoods([]);
    setSelectedCategory(null);
    setSearchQuery("");
    setActiveTab("history");
    
    // Call onSubmit if provided
    if (onSubmit) {
      onSubmit(newMealEntry);
    }
  };
  
  // Get meal type name by id
  const getMealTypeName = (mealTypeId: string) => {
    return mealTypes.find(type => type.id === mealTypeId)?.name || mealTypeId;
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">ثبت رژیم غذایی</CardTitle>
        <CardDescription className="text-center">
          وعده‌های غذایی خود را ثبت کنید تا بتوانیم توصیه‌های شخصی‌سازی شده برای شما ارائه دهیم
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="add" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add">افزودن وعده غذایی</TabsTrigger>
          <TabsTrigger value="history">تاریخچه</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="space-y-4">
          <CardContent className="space-y-4 pt-4">
            {/* Meal Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="mealType">نوع وعده غذایی</Label>
              <Select 
                value={selectedMealType} 
                onValueChange={setSelectedMealType}
              >
                <SelectTrigger id="mealType">
                  <SelectValue placeholder="انتخاب نوع وعده غذایی" />
                </SelectTrigger>
                <SelectContent>
                  {mealTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Food Search */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="searchFood">جستجوی غذا</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="searchFood"
                    placeholder="نام غذا را وارد کنید..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-3 pl-10"
                  />
                </div>
              </div>
              
              {/* Food Categories */}
              <div className="flex flex-wrap gap-2">
                {foodCategories.map(category => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={selectedCategory === category.id 
                      ? "bg-[#c19a48] hover:bg-[#a17c34] cursor-pointer" 
                      : "hover:bg-slate-100 cursor-pointer"}
                    onClick={() => setSelectedCategory(prev => prev === category.id ? null : category.id)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Food Items */}
            <div className="border rounded-md overflow-hidden">
              <h3 className="bg-slate-50 p-3 text-sm font-medium border-b">
                نتایج جستجو
              </h3>
              <ScrollArea className="h-48">
                <div className="divide-y">
                  {filteredFoods.length > 0 ? (
                    filteredFoods.map(food => (
                      <div key={food.id} className="flex items-center justify-between p-3 hover:bg-slate-50">
                        <div>
                          <p className="font-medium">{food.name}</p>
                          <p className="text-xs text-slate-500">
                            {food.calories} کالری | پروتئین: {food.protein}گرم | کربوهیدرات: {food.carbs}گرم | چربی: {food.fat}گرم
                          </p>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => addFood(food)}
                          disabled={selectedFoods.some(f => f.id === food.id)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-slate-500">
                      غذایی یافت نشد. لطفاً جستجوی دیگری انجام دهید.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
            
            {/* Selected Foods */}
            {selectedFoods.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-md font-medium flex items-center gap-1">
                  <span>غذاهای انتخاب شده</span>
                  <Badge variant="outline">{selectedFoods.length}</Badge>
                </h3>
                
                <div className="border rounded-md divide-y">
                  {selectedFoods.map(food => (
                    <div key={food.id} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium">{food.name}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={food.quantity}
                          onChange={(e) => updateFoodQuantity(food.id, Number(e.target.value))}
                          className="w-20"
                          min={1}
                        />
                        
                        <Select
                          value={food.unit}
                          onValueChange={(value) => updateFoodUnit(food.id, value)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="گرم">گرم</SelectItem>
                            <SelectItem value="عدد">عدد</SelectItem>
                            <SelectItem value="فنجان">فنجان</SelectItem>
                            <SelectItem value="قاشق">قاشق</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFood(food.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Nutrition Summary */}
                <div className="bg-slate-50 rounded-md p-3">
                  <div className="flex items-center gap-1 mb-2">
                    <Info className="h-4 w-4 text-[#c19a48]" />
                    <h4 className="text-sm font-medium">خلاصه ارزش غذایی</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white p-2 rounded border text-center">
                      <p className="text-xs text-slate-500">کالری</p>
                      <p className="font-bold text-lg">{calculateTotals().totalCalories}</p>
                    </div>
                    <div className="bg-white p-2 rounded border text-center">
                      <p className="text-xs text-slate-500">پروتئین</p>
                      <p className="font-bold text-lg">{calculateTotals().totalProtein}g</p>
                    </div>
                    <div className="bg-white p-2 rounded border text-center">
                      <p className="text-xs text-slate-500">کربوهیدرات</p>
                      <p className="font-bold text-lg">{calculateTotals().totalCarbs}g</p>
                    </div>
                    <div className="bg-white p-2 rounded border text-center">
                      <p className="text-xs text-slate-500">چربی</p>
                      <p className="font-bold text-lg">{calculateTotals().totalFat}g</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button
              type="button"
              className="bg-[#c19a48] hover:bg-[#a17c34]"
              onClick={saveMealEntry}
              disabled={selectedFoods.length === 0}
            >
              ثبت وعده غذایی
            </Button>
          </CardFooter>
        </TabsContent>
        
        <TabsContent value="history">
          <CardContent className="pt-4">
            {mealEntries.length > 0 ? (
              <div className="space-y-4">
                {mealEntries.map((entry, index) => (
                  <Card key={index}>
                    <CardHeader className="py-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md font-medium">
                          {getMealTypeName(entry.mealType)}
                        </CardTitle>
                        <Badge className="bg-[#c19a48] text-white">
                          {entry.totalCalories} کالری
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="space-y-2">
                        {entry.foods.map((food, foodIndex) => (
                          <div key={foodIndex} className="flex justify-between items-center text-sm py-1">
                            <span>{food.name}</span>
                            <span className="text-slate-500">{food.quantity} {food.unit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t py-3 mt-2">
                      <div className="flex justify-between w-full text-xs text-slate-500">
                        <span>پروتئین: {entry.totalProtein}g</span>
                        <span>کربوهیدرات: {entry.totalCarbs}g</span>
                        <span>چربی: {entry.totalFat}g</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <p>هنوز وعده غذایی ثبت نشده است.</p>
                <Button 
                  type="button" 
                  variant="link" 
                  onClick={() => setActiveTab("add")}
                  className="mt-2 text-[#c19a48]"
                >
                  اولین وعده غذایی خود را ثبت کنید
                </Button>
              </div>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
} 