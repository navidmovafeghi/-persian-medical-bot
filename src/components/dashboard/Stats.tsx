"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity, 
  Pill, 
  Calendar,
  UserRound,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatsProps {
  metrics?: {
    completedTasks: number;
    pendingTasks: number;
    medicationAdherence: number;
    upcomingAppointments: number;
    metricsTrend: 'improving' | 'declining' | 'stable';
  }
}

const defaultMetrics = {
  completedTasks: 0,
  pendingTasks: 0,
  medicationAdherence: 0,
  upcomingAppointments: 0,
  metricsTrend: 'stable' as const
};

const Stats = ({ metrics = defaultMetrics }: StatsProps) => {
  const getTrendIcon = (trend: 'improving' | 'declining' | 'stable') => {
    switch (trend) {
      case 'improving':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'declining':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">وظایف انجام شده</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.completedTasks}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.pendingTasks} وظیفه باقی‌مانده
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">پایبندی به دارو</CardTitle>
          <Pill className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.medicationAdherence}%</div>
          <p className="text-xs text-muted-foreground flex items-center">
            {getTrendIcon(metrics.metricsTrend)}
            <span className="ml-1">در هفته جاری</span>
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">قرارهای پیش رو</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.upcomingAppointments}</div>
          <p className="text-xs text-muted-foreground">
            در ۳۰ روز آینده
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">وضعیت کلی</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Badge className={metrics.metricsTrend === 'improving' ? 'bg-green-100 text-green-800' : 
              metrics.metricsTrend === 'declining' ? 'bg-red-100 text-red-800' : 
              'bg-amber-100 text-amber-800'}>
              {metrics.metricsTrend === 'improving' ? 'بهبود' : 
               metrics.metricsTrend === 'declining' ? 'نیاز به توجه' : 'ثابت'}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            بر اساس روند هفته اخیر
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats; 