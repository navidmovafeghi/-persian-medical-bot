"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from 'date-fns';

// For formatting dates in Persian
const formatPersianDate = (date: Date) => {
  try {
    // Fallback to standard format if Persian formatting fails
    return format(date, 'yyyy/MM/dd');
  } catch (error) {
    return format(date, 'yyyy/MM/dd');
  }
};

interface Appointment {
  id: string;
  date: Date;
  time: string;
  doctorName: string;
  doctorSpecialty: string;
  location: string;
  doctorImageUrl?: string;
}

interface UpcomingAppointmentsProps {
  appointments?: Appointment[];
  onReschedule?: (id: string) => void;
  onCancel?: (id: string) => void;
}

const UpcomingAppointments = ({ 
  appointments = [], 
  onReschedule = () => {},
  onCancel = () => {} 
}: UpcomingAppointmentsProps) => {
  // Sort appointments by date (earliest first)
  const sortedAppointments = [...appointments].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Get doctor initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };
  
  // Calculate days until appointment
  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'امروز';
    } else if (diffDays === 1) {
      return 'فردا';
    } else {
      return `${diffDays} روز دیگر`;
    }
  };
  
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>قرارهای ملاقات آینده</CardTitle>
        <Calendar className="h-5 w-5" />
      </CardHeader>
      <CardContent>
        {sortedAppointments.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            هیچ قرار ملاقاتی برای نمایش وجود ندارد
          </div>
        ) : (
          <div className="space-y-5">
            {sortedAppointments.map(appointment => (
              <div 
                key={appointment.id} 
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Avatar>
                      {appointment.doctorImageUrl && (
                        <AvatarImage src={appointment.doctorImageUrl} alt={appointment.doctorName} />
                      )}
                      <AvatarFallback>{getInitials(appointment.doctorName)}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h4 className="font-medium">{appointment.doctorName}</h4>
                      <p className="text-sm text-muted-foreground">{appointment.doctorSpecialty}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">{getDaysUntil(appointment.date)}</div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span>{formatPersianDate(appointment.date)}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span>{appointment.time}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 ml-2 text-muted-foreground" />
                    <span>{appointment.location}</span>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 space-x-reverse pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onReschedule(appointment.id)}
                  >
                    تغییر زمان
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onCancel(appointment.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    لغو
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="pt-2 text-center">
              <Button variant="ghost" size="sm">
                مشاهده همه قرارها
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments; 