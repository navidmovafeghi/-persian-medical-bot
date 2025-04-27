"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Phone, Contact, Ruler, Scale, Calculator, Edit, Save, X, ShieldCheck } from "lucide-react";

// Define an interface for the form data
interface UserInfo {
  firstName: string;
  lastName: string;
  nationalId: string;
  dob: string;
  bloodType: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;
  emergencyName: string;
  emergencyRelation: string;
  emergencyPhone: string;
  height: string;
  weight: string;
  bmi: string;
  insuranceProvider: string;
  policyNumber: string;
  groupNumber: string;
}

export default function BasicInfoPage() {
  const [isEditing, setIsEditing] = useState(false);
  // Initialize state with placeholder data (replace with actual data fetching later)
  const [formData, setFormData] = useState<UserInfo>({
    firstName: "علی",
    lastName: "محمدی",
    nationalId: "۰۰۱۲۳۴۵۶۷۸",
    dob: "۱۳۶۵/۴/۱۵",
    bloodType: "A+",
    gender: "مرد",
    mobile: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "ali.mohammadi@example.com",
    address: "تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲",
    emergencyName: "سارا محمدی",
    emergencyRelation: "همسر",
    emergencyPhone: "۰۹۱۰۹۸۷۶۵۴۳",
    height: "۱۷۵", // Store numbers as strings for input compatibility for now
    weight: "۷۰",
    bmi: "۲۲.۹",
    insuranceProvider: "بیمه تکمیلی ایران",
    policyNumber: "POLICY12345",
    groupNumber: "GROUP67890",
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
    // Potentially reset changes on cancel, or fetch original data again
    if (isEditing) {
      // Logic to reset or re-fetch original data if needed when cancelling
      // For now, just toggle back
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Saving data:", formData); // Placeholder for actual save logic
    setIsEditing(false); // Exit edit mode after saving
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="bg-[#0096c7]/10 rounded-lg p-6 flex flex-col md:flex-row items-center md:justify-between gap-4 border border-[#0096c7]/20 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">اطلاعات پایه</h1>
          <p className="text-slate-600 mt-2">اطلاعات شخصی، تماس، اورژانسی و فیزیکی شما</p>
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
      
      <Card className="border border-slate-200 rounded-md shadow-sm">
        <CardHeader className="bg-[#0096c7]/10 border-b border-[#0096c7]/15 pb-4">
          <CardTitle className="flex items-center">
            <User className="ml-2 h-5 w-5 text-[#0096c7]" />
            اطلاعات شخصی
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="firstName" className="text-sm font-medium text-slate-500 block mb-1">نام</label>
              {isEditing ? (
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="text-sm font-medium text-slate-500 block mb-1">نام خانوادگی</label>
              {isEditing ? (
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.lastName}</p>
              )}
            </div>
            <div>
              <label htmlFor="nationalId" className="text-sm font-medium text-slate-500 block mb-1">کد ملی</label>
              {isEditing ? (
                <Input id="nationalId" name="nationalId" value={formData.nationalId} onChange={handleInputChange} />
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.nationalId}</p>
              )}
            </div>
            <div>
              <label htmlFor="dob" className="text-sm font-medium text-slate-500 block mb-1">تاریخ تولد</label>
              {isEditing ? (
                <Input id="dob" name="dob" value={formData.dob} onChange={handleInputChange} /> // Consider a Date Picker component later
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.dob}</p>
              )}
            </div>
            <div>
              <label htmlFor="bloodType" className="text-sm font-medium text-slate-500 block mb-1">گروه خونی</label>
              {isEditing ? (
                <Input id="bloodType" name="bloodType" value={formData.bloodType} onChange={handleInputChange} /> // Consider Select component later
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.bloodType}</p>
              )}
            </div>
            <div>
              <label htmlFor="gender" className="text-sm font-medium text-slate-500 block mb-1">جنسیت</label>
              {isEditing ? (
                <Input id="gender" name="gender" value={formData.gender} onChange={handleInputChange} /> // Consider Select component later
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.gender}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-slate-200 rounded-md shadow-sm">
        <CardHeader className="bg-[#0096c7]/10 border-b border-[#0096c7]/15 pb-4">
          <CardTitle className="flex items-center">
            <Phone className="ml-2 h-5 w-5 text-[#0096c7]" />
            اطلاعات تماس
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="mobile" className="text-sm font-medium text-slate-500 block mb-1">تلفن همراه</label>
              {isEditing ? (
                <Input id="mobile" name="mobile" type="tel" value={formData.mobile} onChange={handleInputChange} />
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.mobile}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-slate-500 block mb-1">ایمیل</label>
              {isEditing ? (
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.email}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="text-sm font-medium text-slate-500 block mb-1">آدرس</label>
              {isEditing ? (
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} /> // Consider Textarea later
              ) : (
                <p className="font-medium text-slate-800 min-h-10 flex items-center">{formData.address}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-slate-200 rounded-md shadow-sm">
        <CardHeader className="bg-[#0096c7]/10 border-b border-[#0096c7]/15 pb-4">
          <CardTitle className="flex items-center">
            <Contact className="ml-2 h-5 w-5 text-[#0096c7]" />
            مخاطب اضطراری
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="emergencyName" className="text-sm font-medium text-slate-500 block mb-1">نام</label>
              {isEditing ? (
                <Input id="emergencyName" name="emergencyName" value={formData.emergencyName} onChange={handleInputChange} />
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.emergencyName}</p>
              )}
            </div>
            <div>
              <label htmlFor="emergencyRelation" className="text-sm font-medium text-slate-500 block mb-1">نسبت</label>
              {isEditing ? (
                <Input id="emergencyRelation" name="emergencyRelation" value={formData.emergencyRelation} onChange={handleInputChange} />
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.emergencyRelation}</p>
              )}
            </div>
            <div>
              <label htmlFor="emergencyPhone" className="text-sm font-medium text-slate-500 block mb-1">تلفن تماس</label>
              {isEditing ? (
                <Input id="emergencyPhone" name="emergencyPhone" type="tel" value={formData.emergencyPhone} onChange={handleInputChange} />
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.emergencyPhone}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-slate-200 rounded-md shadow-sm">
        <CardHeader className="bg-[#0096c7]/10 border-b border-[#0096c7]/15 pb-4">
          <CardTitle className="flex items-center">
            <Scale className="ml-2 h-5 w-5 text-[#0096c7]" />
            مشخصات فیزیکی
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="height" className="text-sm font-medium text-slate-500 block mb-1 flex items-center">
                <Ruler className="ml-1 h-4 w-4 text-slate-400"/> قد (سانتی‌متر)
              </label>
              {isEditing ? (
                <Input id="height" name="height" type="number" value={formData.height} onChange={handleInputChange} />
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.height} سانتی‌متر</p>
              )}
            </div>
            <div>
              <label htmlFor="weight" className="text-sm font-medium text-slate-500 block mb-1 flex items-center">
                <Scale className="ml-1 h-4 w-4 text-slate-400"/> وزن (کیلوگرم)
              </label>
              {isEditing ? (
                <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleInputChange} />
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.weight} کیلوگرم</p>
              )}
            </div>
            <div>
              <label htmlFor="bmi" className="text-sm font-medium text-slate-500 block mb-1 flex items-center">
                 <Calculator className="ml-1 h-4 w-4 text-slate-400"/> BMI
              </label>
              {isEditing ? (
                <Input id="bmi" name="bmi" type="number" step="0.1" value={formData.bmi} onChange={handleInputChange} /> 
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.bmi} (نرمال)</p> 
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insurance Information Card */}
      <Card className="border border-slate-200 rounded-md shadow-sm">
        <CardHeader className="bg-[#0096c7]/10 border-b border-[#0096c7]/15 pb-4">
          <CardTitle className="flex items-center">
            <ShieldCheck className="ml-2 h-5 w-5 text-[#0096c7]" />
            اطلاعات بیمه
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="insuranceProvider" className="text-sm font-medium text-slate-500 block mb-1">شرکت بیمه</label>
              {isEditing ? (
                <Input id="insuranceProvider" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleInputChange} />
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.insuranceProvider}</p>
              )}
            </div>
            <div>
              <label htmlFor="policyNumber" className="text-sm font-medium text-slate-500 block mb-1">شماره بیمه‌نامه</label>
              {isEditing ? (
                <Input id="policyNumber" name="policyNumber" value={formData.policyNumber} onChange={handleInputChange} />
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.policyNumber}</p>
              )}
            </div>
            <div>
              <label htmlFor="groupNumber" className="text-sm font-medium text-slate-500 block mb-1">شماره گروه</label>
              {isEditing ? (
                <Input id="groupNumber" name="groupNumber" value={formData.groupNumber} onChange={handleInputChange} />
              ) : (
                <p className="font-medium text-slate-800 h-10 flex items-center">{formData.groupNumber}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
} 