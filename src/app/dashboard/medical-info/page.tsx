"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Edit, 
  Save, 
  X, 
  Cigarette, 
  HeartPulse, 
  ClipboardList,
  Pill,
  Activity,
  Users,
  ShieldCheck
} from "lucide-react";

interface MedicalInfo {
  allergies: string[];
  medications: {
    name: string;
    dosage: string;
    instructions: string;
  }[];
  conditions: {
    name: string;
    diagnosisDate: string;
    notes: string;
  }[];
  doctors: {
    name: string;
    specialty: string;
    phone: string;
  }[];
  pcpName: string;
  pcpPhone: string;
  pcpClinic: string;
  medicalHistorySummary: string;
  familyMedicalHistory: string;
  smokingStatus: string;
}

export default function MedicalInfoPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<MedicalInfo>({
    allergies: ["پنی‌سیلین", "گرده گل"],
    medications: [
      { name: "متفورمین", dosage: "۵۰۰ میلی‌گرم", instructions: "روزی ۲ بار بعد از غذا" },
      { name: "لوزارتان", dosage: "۵۰ میلی‌گرم", instructions: "روزی ۱ بار صبح" },
      { name: "آسپرین", dosage: "۸۰ میلی‌گرم", instructions: "روزی ۱ بار" }
    ],
    conditions: [
      { name: "دیابت نوع ۲", diagnosisDate: "۱۳۹۵/۸/۱۲", notes: "تحت کنترل با دارو و رژیم غذایی" },
      { name: "فشار خون بالا", diagnosisDate: "۱۳۹۷/۳/۲۰", notes: "تحت درمان با داروهای کاهنده فشار خون" }
    ],
    doctors: [
      { name: "دکتر محمدی", specialty: "متخصص داخلی", phone: "۰۲۱-۸۸۷۶۵۴۳۲" },
      { name: "دکتر احمدی", specialty: "متخصص قلب و عروق", phone: "۰۲۱-۷۷۶۵۴۳۲۱" }
    ],
    pcpName: "دکتر احمد رضایی",
    pcpPhone: "۰۲۱-۸۸۷۷۶۶۵۵",
    pcpClinic: "کلینیک سلامت",
    medicalHistorySummary: "فشار خون بالا از سال ۱۳۹۰، جراحی آپاندیس در سال ۱۳۸۵",
    familyMedicalHistory: "سابقه بیماری قلبی در پدر، دیابت در مادر",
    smokingStatus: "هرگز سیگار نکشیده‌ام"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving medical data:", formData);
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Hero section */}
      <div className="bg-[#0096c7]/10 rounded-lg p-6 flex flex-col md:flex-row items-center md:justify-between gap-4 border border-[#0096c7]/20 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">اطلاعات پزشکی</h1>
          <p className="text-slate-600 mt-2">سوابق پزشکی و اطلاعات درمانی شما</p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge variant="secondary" className="bg-[#0096c7]/15 text-[#0096c7] hover:bg-[#0096c7]/25">
              <Pill className="w-3 h-3 ml-1 text-[#0096c7]" />۳ داروی مصرفی
            </Badge>
            <Badge variant="secondary" className="bg-[#0096c7]/15 text-[#0096c7] hover:bg-[#0096c7]/25">
              <HeartPulse className="w-3 h-3 ml-1 text-[#0096c7]" />۲ بیماری
            </Badge>
            <Badge variant="secondary" className="bg-[#0096c7]/15 text-[#0096c7] hover:bg-[#0096c7]/25">
              <ShieldCheck className="w-3 h-3 ml-1 text-[#0096c7]" />۲ حساسیت
            </Badge>
          </div>
        </div>
        <div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button type="submit" size="sm" className="bg-[#0096c7] hover:bg-[#0077b6]">
                <Save className="ml-1 h-4 w-4" /> ذخیره
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={handleEditToggle} className="border-[#0096c7] text-[#0096c7]">
                <X className="ml-1 h-4 w-4" /> لغو
              </Button>
            </div>
          ) : (
            <Button type="button" variant="outline" size="sm" onClick={handleEditToggle} className="border-[#0096c7] text-[#0096c7]">
              <Edit className="ml-1 h-4 w-4" /> ویرایش
            </Button>
          )}
        </div>
      </div>
      
      {/* Main content grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Current Medications - spans 2 cols on lg */}
        <Card className="border border-slate-200 rounded-md shadow-inner lg:col-span-2">
          <CardHeader className="bg-[#0096c7]/10 border-b border-[#0096c7]/15 pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center">
                  <Pill className="ml-2 h-5 w-5 text-[#0096c7]" />
                  داروهای مصرفی
                </CardTitle>
                <CardDescription>داروهایی که در حال حاضر مصرف می‌کنید</CardDescription>
              </div>
              <Badge className="bg-[#0096c7]/15 text-[#0096c7]">{formData.medications.length} دارو</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formData.medications.map((medication, index) => (
                <div key={index} className="border border-[#0096c7]/20 rounded-lg p-4 bg-white hover:bg-[#0096c7]/5 transition-colors">
                  <h3 className="font-medium text-slate-800">{medication.name}</h3>
                  <p className="text-sm text-muted-foreground">{medication.dosage}</p>
                  <p className="text-sm mt-2 text-slate-600">{medication.instructions}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Allergies */}
        <Card className="border border-slate-200 rounded-md shadow-inner">
          <CardHeader className="bg-[#0096c7]/10 border-b border-[#0096c7]/15 pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center">
                  <ShieldCheck className="ml-2 h-5 w-5 text-[#0096c7]" />
                  آلرژی‌ها
                </CardTitle>
                <CardDescription>موارد حساسیت شناخته شده</CardDescription>
              </div>
              <Badge className="bg-[#0096c7]/15 text-[#0096c7]">{formData.allergies.length} مورد</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex gap-2 flex-wrap">
              {formData.allergies.map((allergy, index) => (
                <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">{allergy}</span>
              ))}
            </div>
            <div className="mt-4">
              {isEditing && (
                <div className="border-t border-dashed border-slate-200 pt-4 mt-2">
                  <label className="text-sm font-medium text-slate-500 block mb-2">افزودن حساسیت جدید</label>
                  <div className="flex gap-2">
                    <Input placeholder="نام حساسیت" className="border-slate-300" />
                    <Button type="button" size="sm" className="bg-[#0096c7] hover:bg-[#0077b6]">افزودن</Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      
        {/* Conditions - spans 2 cols on lg */}
        <Card className="border border-slate-200 rounded-md shadow-inner lg:col-span-2">
          <CardHeader className="bg-[#0096c7]/10 border-b border-[#0096c7]/15 pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center">
                  <Activity className="ml-2 h-5 w-5 text-[#0096c7]" />
                  سوابق بیماری‌ها
                </CardTitle>
                <CardDescription>بیماری‌های ثبت شده در پرونده شما</CardDescription>
              </div>
              <Badge className="bg-[#0096c7]/15 text-[#0096c7]">{formData.conditions.length} بیماری</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#0096c7]/10">
              {formData.conditions.map((condition, index) => (
                <div key={index} className="p-4 hover:bg-[#0096c7]/5 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#0096c7]/15 flex items-center justify-center ml-3">
                      <Activity className="h-5 w-5 text-[#0096c7]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800">{condition.name}</h3>
                      <p className="text-sm text-muted-foreground">تشخیص: {condition.diagnosisDate}</p>
                      <p className="text-sm mt-1 text-slate-600">{condition.notes}</p>
          </div>
        </div>
      </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lifestyle Factors */}
        <Card className="border border-slate-200 rounded-md shadow-inner">
          <CardHeader className="bg-[#0096c7]/10 border-b border-[#0096c7]/15 pb-4">
            <CardTitle className="flex items-center">
              <Activity className="ml-2 h-5 w-5 text-[#0096c7]" />
              عوامل سبک زندگی
            </CardTitle>
            <CardDescription>عوامل مؤثر بر سلامت مرتبط با سبک زندگی</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div>
              <div className="mb-4">
                <label className="text-sm font-medium text-slate-500 block mb-2 flex items-center">
                  <Cigarette className="ml-1 h-4 w-4 text-[#0096c7]"/> وضعیت استعمال دخانیات
                </label>
                {isEditing ? (
                  <Input name="smokingStatus" value={formData.smokingStatus} onChange={handleInputChange} className="border-slate-300" />
                ) : (
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#0096c7]/15 flex items-center justify-center ml-2">
                      <Cigarette className="h-4 w-4 text-[#0096c7]" />
                    </div>
                    <p className="font-medium text-slate-800">{formData.smokingStatus}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Primary Care Physician and Doctors combined */}
        <Card className="border border-slate-200 rounded-md shadow-inner lg:col-span-3">
          <CardHeader className="bg-[#0096c7]/10 border-b border-[#0096c7]/15 pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center">
                  <HeartPulse className="ml-2 h-5 w-5 text-[#0096c7]" />
                  اطلاعات پزشکان
                </CardTitle>
                <CardDescription>پزشک اصلی و پزشکان متخصص شما</CardDescription>
              </div>
              <Badge className="bg-[#0096c7]/15 text-[#0096c7]">{formData.doctors.length + 1} پزشک</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* PCP section */}
              <div className="lg:col-span-1">
                <div className="bg-[#0096c7]/5 p-4 rounded-lg border border-[#0096c7]/15">
                  <h3 className="font-medium text-slate-800 flex items-center mb-3">
                    <HeartPulse className="h-4 w-4 ml-1 text-[#0096c7]" />
                    پزشک مراقبت‌های اولیه
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">نام پزشک</label>
                      {isEditing ? (
                        <Input name="pcpName" value={formData.pcpName} onChange={handleInputChange} className="border-slate-300 text-sm" />
                      ) : (
                        <p className="font-medium text-slate-800 text-sm">{formData.pcpName}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">تلفن تماس</label>
                      {isEditing ? (
                        <Input name="pcpPhone" type="tel" value={formData.pcpPhone} onChange={handleInputChange} className="border-slate-300 text-sm" />
                      ) : (
                        <p className="font-medium text-slate-800 text-sm">{formData.pcpPhone}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">کلینیک/بیمارستان</label>
                      {isEditing ? (
                        <Input name="pcpClinic" value={formData.pcpClinic} onChange={handleInputChange} className="border-slate-300 text-sm" />
                      ) : (
                        <p className="font-medium text-slate-800 text-sm">{formData.pcpClinic}</p>
                      )}
                    </div>
          </div>
        </div>
      </div>
      
              {/* Other doctors */}
              <div className="lg:col-span-3">
                <h3 className="font-medium text-slate-800 mb-3 flex items-center">
                  <HeartPulse className="h-4 w-4 ml-1 text-[#0096c7]" />
                  پزشکان متخصص
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formData.doctors.map((doctor, index) => (
                    <div key={index} className="border border-[#0096c7]/20 rounded-lg p-4 bg-white hover:bg-[#0096c7]/5 transition-colors">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#0096c7]/15 flex items-center justify-center ml-2">
                          <HeartPulse className="h-4 w-4 text-[#0096c7]" />
                        </div>
                        <h3 className="font-medium text-slate-800">{doctor.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      <p className="text-sm mt-1 text-slate-600">تلفن: {doctor.phone}</p>
          </div>
                  ))}
          </div>
        </div>
      </div>
          </CardContent>
        </Card>

        {/* Medical History Summary and Family Medical History combined */}
        <Card className="border border-slate-200 rounded-md shadow-inner lg:col-span-3">
          <CardHeader className="bg-[#0096c7]/10 border-b border-[#0096c7]/15 pb-4">
            <CardTitle className="flex items-center">
              <ClipboardList className="ml-2 h-5 w-5 text-[#0096c7]" />
              سوابق پزشکی
            </CardTitle>
            <CardDescription>خلاصه سوابق پزشکی شخصی و خانوادگی</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-slate-800 mb-3 flex items-center">
                  <ClipboardList className="h-4 w-4 ml-1 text-[#0096c7]" />
                  خلاصه سابقه پزشکی شخصی
                </h3>
                {isEditing ? (
                  <Textarea 
                    name="medicalHistorySummary" 
                    value={formData.medicalHistorySummary} 
                    onChange={handleInputChange} 
                    rows={4} 
                    className="border-slate-300 h-full min-h-[120px]" 
                  />
                ) : (
                  <p className="font-medium text-slate-800">{formData.medicalHistorySummary || "ثبت نشده"}</p>
                )}
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-3 flex items-center">
                  <Users className="h-4 w-4 ml-1 text-[#0096c7]" />
                  سابقه پزشکی خانوادگی
                </h3>
                {isEditing ? (
                  <Textarea 
                    name="familyMedicalHistory" 
                    value={formData.familyMedicalHistory} 
                    onChange={handleInputChange} 
                    rows={4} 
                    className="border-slate-300 h-full min-h-[120px]" 
                  />
                ) : (
                  <p className="font-medium text-slate-800">{formData.familyMedicalHistory || "ثبت نشده"}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
    </form>
  );
} 