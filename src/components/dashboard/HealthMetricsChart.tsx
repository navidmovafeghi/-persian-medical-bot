"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HealthMetric, MetricHistoryPoint } from "@/types/dashboard";
import { format } from 'date-fns';

type TimeRange = 'week' | 'month' | 'year' | 'all';

interface HealthMetricsChartProps {
  metrics?: HealthMetric[];
  selectedMetricIds?: string[];
  selectedTimeRange?: TimeRange;
  onTimeRangeChange?: (range: TimeRange) => void;
}

const HealthMetricsChart = ({
  metrics = [],
  selectedMetricIds = [],
  selectedTimeRange = 'week',
  onTimeRangeChange = () => {}
}: HealthMetricsChartProps) => {
  // Filter metrics to only show selected ones
  const filteredMetrics = metrics.filter(metric => selectedMetricIds.includes(metric.id));
  
  // Filter history data based on time range
  const filterHistoryByTimeRange = (history: MetricHistoryPoint[], range: TimeRange): MetricHistoryPoint[] => {
    const now = new Date();
    switch (range) {
      case 'week':
        const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        return history.filter(point => point.date >= oneWeekAgo);
      case 'month':
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return history.filter(point => point.date >= oneMonthAgo);
      case 'year':
        const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        return history.filter(point => point.date >= oneYearAgo);
      case 'all':
      default:
        return history;
    }
  };
  
  // Prepare data for the chart
  const prepareChartData = () => {
    if (filteredMetrics.length === 0) return [];
    
    // Map and combine history data from all selected metrics
    const combinedData: { [key: string]: any } = {};
    
    filteredMetrics.forEach(metric => {
      const filteredHistory = filterHistoryByTimeRange(metric.history, selectedTimeRange);
      
      filteredHistory.forEach(point => {
        const dateStr = format(point.date, 'yyyy-MM-dd');
        
        if (!combinedData[dateStr]) {
          combinedData[dateStr] = { date: dateStr };
        }
        
        if (typeof point.value === 'number') {
          combinedData[dateStr][metric.id] = point.value;
        } else if (point.value && typeof point.value === 'object' && 'systolic' in point.value) {
          // Handle blood pressure (has systolic and diastolic)
          combinedData[dateStr][`${metric.id}_systolic`] = point.value.systolic;
          combinedData[dateStr][`${metric.id}_diastolic`] = point.value.diastolic;
        }
      });
    });
    
    // Convert the combined data object to an array
    return Object.values(combinedData).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };
  
  const chartData = prepareChartData();
  
  // Generate a unique color for each metric
  const getMetricColor = (index: number) => {
    const colors = ['#1E88E5', '#E53935', '#43A047', '#FB8C00', '#8E24AA', '#00ACC1'];
    return colors[index % colors.length];
  };
  
  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      let formattedDate;
      try {
        // Convert the label to a readable date format
        formattedDate = new Date(label).toLocaleDateString();
      } catch (e) {
        formattedDate = label;
      }
      
      return (
        <div className="custom-tooltip bg-white p-3 border border-gray-200 rounded shadow-sm">
          <p className="label mb-2 font-bold">{formattedDate}</p>
          {payload.map((entry: any, index: number) => {
            // Find the metric this entry belongs to
            const metric = filteredMetrics.find(m => 
              entry.dataKey === m.id || 
              entry.dataKey === `${m.id}_systolic` || 
              entry.dataKey === `${m.id}_diastolic`
            );
            
            if (!metric) return null;
            
            let name = metric.name;
            if (entry.dataKey.includes('_systolic')) name += ' (سیستولیک)';
            if (entry.dataKey.includes('_diastolic')) name += ' (دیاستولیک)';
            
            return (
              <p key={index} style={{ color: entry.color }}>
                {name}: {entry.value} {metric.unit}
              </p>
            );
          })}
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>روند شاخص‌های سلامتی</CardTitle>
        <Tabs 
          defaultValue={selectedTimeRange} 
          className="w-auto" 
          onValueChange={(value) => onTimeRangeChange(value as TimeRange)}
        >
          <TabsList>
            <TabsTrigger value="week">هفته</TabsTrigger>
            <TabsTrigger value="month">ماه</TabsTrigger>
            <TabsTrigger value="year">سال</TabsTrigger>
            <TabsTrigger value="all">همه</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {filteredMetrics.length === 0 ? (
          <div className="flex justify-center items-center h-60 text-muted-foreground">
            لطفاً حداقل یک شاخص را انتخاب کنید
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => format(new Date(date), 'MM/dd')} 
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                {/* Render lines for each metric */}
                {filteredMetrics.map((metric, index) => {
                  const color = getMetricColor(index);
                  
                  if (metric.id === 'bloodPressure') {
                    // Special case for blood pressure - render two lines (systolic and diastolic)
                    return (
                      <React.Fragment key={metric.id}>
                        <Line 
                          type="monotone" 
                          dataKey={`${metric.id}_systolic`} 
                          name={`${metric.name} (سیستولیک)`} 
                          stroke={color} 
                          activeDot={{ r: 8 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey={`${metric.id}_diastolic`} 
                          name={`${metric.name} (دیاستولیک)`} 
                          stroke={`${color}88`} 
                          activeDot={{ r: 8 }}
                          strokeDasharray="5 5"
                        />
                      </React.Fragment>
                    );
                  }
                  
                  return (
                    <Line 
                      key={metric.id}
                      type="monotone" 
                      dataKey={metric.id} 
                      name={metric.name} 
                      stroke={color} 
                      activeDot={{ r: 8 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthMetricsChart; 