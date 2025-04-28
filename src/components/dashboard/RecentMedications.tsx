"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  lastTaken?: Date;
  nextDue?: Date;
  status: 'taken' | 'missed' | 'upcoming';
}

interface RecentMedicationsProps {
  medications?: Medication[];
  onMarkAsTaken?: (id: string) => void;
}

const RecentMedications = ({ 
  medications = [], 
  onMarkAsTaken = () => {} 
}: RecentMedicationsProps) => {
  // Sort medications by status (missed first, then upcoming, then taken)
  const sortedMedications = [...medications].sort((a, b) => {
    const statusOrder = { missed: 0, upcoming: 1, taken: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });
  
  const getStatusBadge = (status: 'taken' | 'missed' | 'upcoming') => {
    switch (status) {
      case 'taken':
        return <Badge className="bg-green-100 text-green-800">مصرف شده</Badge>;
      case 'missed':
        return <Badge className="bg-red-100 text-red-800">از دست رفته</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">در انتظار</Badge>;
    }
  };
  
  const getStatusIcon = (status: 'taken' | 'missed' | 'upcoming') => {
    switch (status) {
      case 'taken':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'missed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'upcoming':
        return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };
  
  const formatTimeAgo = (date?: Date) => {
    if (!date) return '';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins} دقیقه پیش`;
    } else if (diffHours < 24) {
      return `${diffHours} ساعت پیش`;
    } else {
      return `${diffDays} روز پیش`;
    }
  };
  
  const formatTimeUntil = (date?: Date) => {
    if (!date) return '';
    
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins} دقیقه دیگر`;
    } else if (diffHours < 24) {
      return `${diffHours} ساعت دیگر`;
    } else {
      return `${diffDays} روز دیگر`;
    }
  };
  
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>داروهای اخیر</CardTitle>
        <Pill className="h-5 w-5" />
      </CardHeader>
      <CardContent>
        {sortedMedications.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            هیچ دارویی برای نمایش وجود ندارد
          </div>
        ) : (
          <div className="space-y-4">
            {sortedMedications.map(med => (
              <div 
                key={med.id} 
                className="flex items-start justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="mt-1">{getStatusIcon(med.status)}</div>
                  <div className="space-y-1 mx-3">
                    <div className="font-medium">{med.name}</div>
                    <div className="text-sm text-muted-foreground">{med.dosage} • {med.frequency}</div>
                    <div className="flex space-x-2 space-x-reverse pt-1">
                      {getStatusBadge(med.status)}
                      <span className="text-xs text-muted-foreground">
                        {med.status === 'taken' ? formatTimeAgo(med.lastTaken) : 
                         med.status === 'upcoming' ? formatTimeUntil(med.nextDue) : 
                         'باید قبلاً مصرف می‌شد'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {med.status === 'upcoming' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-1"
                    onClick={() => onMarkAsTaken(med.id)}
                  >
                    ثبت مصرف
                  </Button>
                )}
              </div>
            ))}
            
            <div className="pt-2 text-center">
              <Button variant="ghost" size="sm">
                مشاهده همه داروها
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentMedications; 