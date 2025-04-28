"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the form schema with Zod
const medicalFormSchema = z.object({
  // Personal Information
  height: z.string().min(1, { message: "قد باید وارد شود" }),
  weight: z.string().min(1, { message: "وزن باید وارد شود" }),
  age: z.string().min(1, { message: "سن باید وارد شود" }),
  gender: z.enum(["male", "female", "other"], { 
    required_error: "جنسیت باید انتخاب شود" 
  }),
  
  // Medical Conditions
  hasConditions: z.boolean().default(false),
  conditions: z.array(z.string()).optional(),
  
  // Medications
  takingMedications: z.boolean().default(false),
  medications: z.string().optional(),
  
  // Diet Restrictions
  hasDietRestrictions: z.boolean().default(false),
  dietRestrictions: z.array(z.string()).optional(),
  
  // Activity Level
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "veryActive"], {
    required_error: "سطح فعالیت باید انتخاب شود"
  }),
  
  // Health Goals
  healthGoals: z.array(z.string()).min(1, { message: "حداقل یک هدف سلامتی باید انتخاب شود" }),
});

type MedicalFormValues = z.infer<typeof medicalFormSchema>;

// Sample medical conditions
const medicalConditionsList = [
  { id: "diabetes", label: "دیابت" },
  { id: "hypertension", label: "فشار خون بالا" },
  { id: "heartDisease", label: "بیماری قلبی" },
  { id: "asthma", label: "آسم" },
  { id: "thyroid", label: "مشکلات تیروئید" },
  { id: "arthritis", label: "آرتروز" },
  { id: "other", label: "سایر" },
];

// Diet restrictions
const dietRestrictionsList = [
  { id: "vegetarian", label: "گیاهخواری" },
  { id: "vegan", label: "وگان" },
  { id: "glutenFree", label: "بدون گلوتن" },
  { id: "dairyFree", label: "بدون لبنیات" },
  { id: "kosher", label: "کوشر" },
  { id: "halal", label: "حلال" },
  { id: "other", label: "سایر" },
];

// Health goals
const healthGoalsList = [
  { id: "weightLoss", label: "کاهش وزن" },
  { id: "weightGain", label: "افزایش وزن" },
  { id: "muscleBuild", label: "افزایش عضله" },
  { id: "improveEnergy", label: "بهبود انرژی" },
  { id: "improveSleep", label: "بهبود خواب" },
  { id: "lowerBloodPressure", label: "کاهش فشار خون" },
  { id: "lowerCholesterol", label: "کاهش کلسترول" },
  { id: "manageStress", label: "مدیریت استرس" },
];

interface MedicalFormProps {
  onSubmit?: (data: MedicalFormValues) => void;
}

export function MedicalForm({ onSubmit }: MedicalFormProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  
  const form = useForm<MedicalFormValues>({
    resolver: zodResolver(medicalFormSchema),
    defaultValues: {
      height: "",
      weight: "",
      age: "",
      hasConditions: false,
      conditions: [],
      takingMedications: false,
      medications: "",
      hasDietRestrictions: false,
      dietRestrictions: [],
      healthGoals: [],
    },
  });
  
  // Go to next step
  const handleNext = async () => {
    let formValid = false;
    
    // Validate fields based on current step
    if (step === 1) {
      formValid = await form.trigger(["height", "weight", "age", "gender"]);
    } else if (step === 2) {
      formValid = await form.trigger(["hasConditions", "conditions", "takingMedications", "medications"]);
    } else if (step === 3) {
      formValid = await form.trigger(["hasDietRestrictions", "dietRestrictions"]);
    }
    
    if (formValid) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };
  
  // Go to previous step
  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };
  
  // Submit the form
  const handleSubmit = form.handleSubmit((data) => {
    onSubmit?.(data);
  });
  
  // Calculate progress percentage
  const progressPercentage = (step / totalSteps) * 100;
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">اطلاعات پزشکی و سلامتی</CardTitle>
        <CardDescription className="text-center">
          لطفاً اطلاعات زیر را وارد کنید تا بتوانیم توصیه‌های شخصی‌سازی شده برای شما ارائه دهیم
        </CardDescription>
        <div className="w-full bg-slate-100 h-2 rounded-full mt-4">
          <div 
            className="bg-[#c19a48] h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>اطلاعات اولیه</span>
          <span>شرایط پزشکی</span>
          <span>رژیم غذایی</span>
          <span>اهداف</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <form>
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">اطلاعات اولیه</h3>
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">قد (سانتی‌متر)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="قد به سانتی‌متر"
                    {...form.register("height")}
                  />
                  {form.formState.errors.height && (
                    <p className="text-red-500 text-xs">{form.formState.errors.height.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">وزن (کیلوگرم)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="وزن به کیلوگرم"
                    {...form.register("weight")}
                  />
                  {form.formState.errors.weight && (
                    <p className="text-red-500 text-xs">{form.formState.errors.weight.message}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">سن</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="سن"
                  {...form.register("age")}
                />
                {form.formState.errors.age && (
                  <p className="text-red-500 text-xs">{form.formState.errors.age.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>جنسیت</Label>
                <RadioGroup 
                  onValueChange={(value) => form.setValue("gender", value as "male" | "female" | "other")}
                  defaultValue={form.getValues("gender")}
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">مرد</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">زن</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">سایر</Label>
                  </div>
                </RadioGroup>
                {form.formState.errors.gender && (
                  <p className="text-red-500 text-xs">{form.formState.errors.gender.message}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Step 2: Medical Conditions */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">شرایط پزشکی</h3>
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox 
                    id="hasConditions" 
                    checked={form.watch("hasConditions")}
                    onCheckedChange={(checked) => form.setValue("hasConditions", checked as boolean)}
                  />
                  <Label htmlFor="hasConditions">آیا شرایط پزشکی خاصی دارید؟</Label>
                </div>
                
                {form.watch("hasConditions") && (
                  <div className="mt-3 space-y-3 border rounded-md p-3">
                    <p className="text-sm text-slate-600">لطفاً شرایط پزشکی خود را انتخاب کنید:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {medicalConditionsList.map((condition) => (
                        <div key={condition.id} className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox 
                            id={condition.id} 
                            checked={form.watch("conditions")?.includes(condition.id)}
                            onCheckedChange={(checked) => {
                              const currentConditions = form.watch("conditions") || [];
                              if (checked) {
                                form.setValue("conditions", [...currentConditions, condition.id]);
                              } else {
                                form.setValue("conditions", currentConditions.filter(id => id !== condition.id));
                              }
                            }}
                          />
                          <Label htmlFor={condition.id}>{condition.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 mt-6">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox 
                    id="takingMedications" 
                    checked={form.watch("takingMedications")}
                    onCheckedChange={(checked) => form.setValue("takingMedications", checked as boolean)}
                  />
                  <Label htmlFor="takingMedications">آیا دارویی مصرف می‌کنید؟</Label>
                </div>
                
                {form.watch("takingMedications") && (
                  <div className="mt-3 border rounded-md p-3">
                    <Label htmlFor="medications">لطفاً داروهای خود را وارد کنید:</Label>
                    <Input
                      id="medications"
                      placeholder="مثال: متفورمین، لووتیروکسین، ..."
                      className="mt-2"
                      {...form.register("medications")}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Step 3: Diet Restrictions */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">رژیم غذایی</h3>
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox 
                    id="hasDietRestrictions" 
                    checked={form.watch("hasDietRestrictions")}
                    onCheckedChange={(checked) => form.setValue("hasDietRestrictions", checked as boolean)}
                  />
                  <Label htmlFor="hasDietRestrictions">آیا محدودیت غذایی خاصی دارید؟</Label>
                </div>
                
                {form.watch("hasDietRestrictions") && (
                  <div className="mt-3 space-y-3 border rounded-md p-3">
                    <p className="text-sm text-slate-600">لطفاً محدودیت‌های غذایی خود را انتخاب کنید:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {dietRestrictionsList.map((restriction) => (
                        <div key={restriction.id} className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox 
                            id={restriction.id} 
                            checked={form.watch("dietRestrictions")?.includes(restriction.id)}
                            onCheckedChange={(checked) => {
                              const currentRestrictions = form.watch("dietRestrictions") || [];
                              if (checked) {
                                form.setValue("dietRestrictions", [...currentRestrictions, restriction.id]);
                              } else {
                                form.setValue("dietRestrictions", currentRestrictions.filter(id => id !== restriction.id));
                              }
                            }}
                          />
                          <Label htmlFor={restriction.id}>{restriction.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 mt-6">
                <Label htmlFor="activityLevel">سطح فعالیت بدنی</Label>
                <Select 
                  onValueChange={(value) => form.setValue("activityLevel", value as any)}
                  defaultValue={form.getValues("activityLevel")}
                >
                  <SelectTrigger id="activityLevel" className="w-full">
                    <SelectValue placeholder="سطح فعالیت خود را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">کم‌تحرک (فعالیت روزانه معمولی)</SelectItem>
                    <SelectItem value="light">سبک (۱-۲ روز در هفته ورزش)</SelectItem>
                    <SelectItem value="moderate">متوسط (۳-۵ روز در هفته ورزش)</SelectItem>
                    <SelectItem value="active">فعال (۶-۷ روز در هفته ورزش)</SelectItem>
                    <SelectItem value="veryActive">بسیار فعال (ورزش روزانه شدید)</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.activityLevel && (
                  <p className="text-red-500 text-xs">{form.formState.errors.activityLevel.message}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Step 4: Health Goals */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">اهداف سلامتی</h3>
              <Separator />
              
              <div className="space-y-3">
                <p className="text-sm text-slate-600">لطفاً اهداف سلامتی خود را انتخاب کنید (حداقل یک مورد):</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {healthGoalsList.map((goal) => (
                    <div key={goal.id} className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox 
                        id={goal.id} 
                        checked={form.watch("healthGoals")?.includes(goal.id)}
                        onCheckedChange={(checked) => {
                          const currentGoals = form.watch("healthGoals") || [];
                          if (checked) {
                            form.setValue("healthGoals", [...currentGoals, goal.id]);
                          } else {
                            form.setValue("healthGoals", currentGoals.filter(id => id !== goal.id));
                          }
                        }}
                      />
                      <Label htmlFor={goal.id}>{goal.label}</Label>
                    </div>
                  ))}
                </div>
                {form.formState.errors.healthGoals && (
                  <p className="text-red-500 text-xs">{form.formState.errors.healthGoals.message}</p>
                )}
              </div>
            </div>
          )}
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={handlePrevious}>
            بازگشت
          </Button>
        ) : (
          <div></div>
        )}
        
        {step < totalSteps ? (
          <Button type="button" onClick={handleNext}>
            ادامه
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit} className="bg-[#c19a48] hover:bg-[#a17c34]">
            ثبت و ذخیره
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 