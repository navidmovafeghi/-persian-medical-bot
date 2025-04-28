"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Heart, Activity, Utensils, ArrowRight, TrendingUp, Scale, Zap } from "lucide-react";

// Sample data - would come from API in a real app
const healthMetrics = {
  weight: {
    current: 78,
    target: 75,
    unit: "کیلوگرم",
    history: [79.5, 79.2, 78.8, 78.5, 78.2, 78.0],
    trend: "decreasing", // increasing, decreasing, stable
    changePercent: -1.9,
    assessments: [
      { 
        status: "good", 
        message: "روند کاهش وزن شما مطابق با برنامه پیش می‌رود." 
      }
    ]
  },
  bloodSugar: {
    current: 102,
    target: { min: 70, max: 100 },
    unit: "mg/dL",
    history: [110, 108, 105, 103, 104, 102],
    trend: "decreasing",
    changePercent: -7.3,
    assessments: [
      { 
        status: "warning", 
        message: "قند خون شما کمی بالاتر از محدوده طبیعی است." 
      }
    ]
  },
  bloodPressure: {
    current: { systolic: 120, diastolic: 80 },
    target: { systolic: { min: 90, max: 120 }, diastolic: { min: 60, max: 80 } },
    unit: "mmHg",
    history: [
      { systolic: 125, diastolic: 82 },
      { systolic: 123, diastolic: 83 },
      { systolic: 122, diastolic: 81 },
      { systolic: 121, diastolic: 81 },
      { systolic: 120, diastolic: 80 },
      { systolic: 120, diastolic: 80 },
    ],
    trend: "stable",
    changePercent: -4.0,
    assessments: [
      { 
        status: "good", 
        message: "فشار خون شما در محدوده طبیعی قرار دارد." 
      }
    ]
  },
  calorieIntake: {
    current: 1850,
    target: { min: 1600, max: 2000 },
    unit: "کالری",
    history: [2100, 2050, 1950, 1900, 1870, 1850],
    trend: "decreasing",
    changePercent: -11.9,
    assessments: [
      { 
        status: "good", 
        message: "دریافت کالری شما در محدوده هدف قرار دارد." 
      }
    ]
  },
  activityLevel: {
    current: 7500,
    target: 10000,
    unit: "قدم",
    history: [5200, 6300, 7100, 6800, 7200, 7500],
    trend: "increasing",
    changePercent: 44.2,
    assessments: [
      { 
        status: "warning", 
        message: "فعالیت بدنی شما کمتر از هدف تعیین شده است." 
      }
    ]
  },
  waterIntake: {
    current: 1.8,
    target: 2.5,
    unit: "لیتر",
    history: [1.2, 1.4, 1.5, 1.7, 1.6, 1.8],
    trend: "increasing",
    changePercent: 50.0,
    assessments: [
      { 
        status: "warning", 
        message: "مصرف آب شما کمتر از میزان توصیه شده است." 
      }
    ]
  }
};

const healthRecommendations = [
  {
    id: "water-intake",
    category: "nutrition",
    title: "افزایش مصرف آب",
    description: "برای رسیدن به هدف روزانه، هر ۲ ساعت یک لیوان آب بنوشید.",
    priority: "high",
    icon: <Zap className="h-5 w-5 text-blue-500" />,
  },
  {
    id: "walking",
    category: "activity",
    title: "افزایش قدم‌های روزانه",
    description: "۳۰ دقیقه پیاده‌روی اضافی در عصر به شما کمک می‌کند به هدف روزانه قدم برسید.",
    priority: "medium",
    icon: <Activity className="h-5 w-5 text-green-500" />,
  },
  {
    id: "carbs",
    category: "nutrition",
    title: "کاهش مصرف کربوهیدرات‌ها",
    description: "با کاهش مصرف نان و برنج در وعده‌های غذایی، قند خون خود را بهبود ببخشید.",
    priority: "medium",
    icon: <Utensils className="h-5 w-5 text-amber-500" />,
  },
];

type MetricKey = keyof typeof healthMetrics;

export function HealthVisualizations() {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("weight");
  
  // Get trend icon based on trend
  const getTrendIcon = (trend: string, size: number = 4) => {
    switch(trend) {
      case "increasing":
        return <ArrowUp className={`h-${size} w-${size} text-green-500`} />;
      case "decreasing":
        return <ArrowDown className={`h-${size} w-${size} text-red-500`} />;
      default:
        return <ArrowRight className={`h-${size} w-${size} text-amber-500`} />;
    }
  };
  
  // Get health metric status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case "good":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "danger":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };
  
  // Get icon for metric
  const getMetricIcon = (metric: MetricKey) => {
    switch(metric) {
      case "weight":
        return <Scale className="h-5 w-5 text-slate-700" />;
      case "bloodSugar":
        return <Activity className="h-5 w-5 text-red-500" />;
      case "bloodPressure":
        return <Heart className="h-5 w-5 text-red-500" />;
      case "calorieIntake":
        return <Utensils className="h-5 w-5 text-amber-500" />;
      case "activityLevel":
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case "waterIntake":
        return <Zap className="h-5 w-5 text-blue-500" />;
      default:
        return <Activity className="h-5 w-5 text-slate-700" />;
    }
  };
  
  // Calculate progress percentage
  const calculateProgress = (metric: MetricKey) => {
    const data = healthMetrics[metric];
    
    if ('target' in data) {
      if (typeof data.target === 'number') {
        // Simple target (e.g., weight)
        if (data.current > data.target && data.trend === 'decreasing') {
          // We're trying to decrease to reach target
          const initialValue = data.history[0];
          const totalDistance = initialValue - data.target;
          const currentProgress = initialValue - data.current;
          return Math.min(100, Math.round((currentProgress / totalDistance) * 100));
        } else if (data.current < data.target && data.trend === 'increasing') {
          // We're trying to increase to reach target
          const initialValue = data.history[0];
          const totalDistance = data.target - initialValue;
          const currentProgress = data.current - initialValue;
          return Math.min(100, Math.round((currentProgress / totalDistance) * 100));
        } else {
          // Stable or already reached target
          return 100;
        }
      } else if (typeof data.target === 'object' && 'min' in data.target && 'max' in data.target) {
        // Range target (e.g., calorie intake)
        if (data.current < data.target.min) {
          // Below minimum
          return Math.round((data.current / data.target.min) * 100);
        } else if (data.current > data.target.max) {
          // Above maximum
          return Math.round((data.target.max / data.current) * 100);
        } else {
          // Within range
          return 100;
        }
      }
    }
    
    return 0;
  };
  
  // Simple line chart component
  const SimpleLineChart = ({ 
    data, 
    height = 60, 
    color = "#c19a48",
    showDots = true,
    lineWidth = 2,
  }: { 
    data: number[] | { systolic: number, diastolic: number }[], 
    height?: number, 
    color?: string,
    showDots?: boolean,
    lineWidth?: number,
  }) => {
    // Handle blood pressure special case
    const isBloodPressure = typeof data[0] !== 'number';
    
    // Extract values for min/max calculations
    const values = isBloodPressure 
      ? (data as { systolic: number, diastolic: number }[]).flatMap(d => [d.systolic, d.diastolic])
      : (data as number[]);
    
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    
    // Normalize values to fit in the chart
    const normalizeValue = (value: number) => {
      return height - ((value - min) / range) * height * 0.8;
    };
    
    // Calculate coordinates for the lines
    const points = isBloodPressure 
      ? (data as { systolic: number, diastolic: number }[]).map((d, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y1 = normalizeValue(d.systolic);
          const y2 = normalizeValue(d.diastolic);
          return { x, y1, y2 };
        })
      : (data as number[]).map((value, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = normalizeValue(value);
          return { x, y };
        });
    
    // Generate SVG path
    const generatePath = (points: { x: number, y: number }[]) => {
      return points.map((point, i) => 
        i === 0 
          ? `M ${point.x} ${point.y}` 
          : `L ${point.x} ${point.y}`
      ).join(' ');
    };
    
    // For blood pressure, we need two lines
    if (isBloodPressure) {
      const systolicPoints = points.map(p => ({ x: p.x, y: p.y1 }));
      const diastolicPoints = points.map(p => ({ x: p.x, y: p.y2 }));
      
      return (
        <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
          {/* Systolic line */}
          <path
            d={generatePath(systolicPoints)}
            fill="none"
            stroke={color}
            strokeWidth={lineWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Diastolic line */}
          <path
            d={generatePath(diastolicPoints)}
            fill="none"
            stroke={`${color}80`}
            strokeWidth={lineWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="3,3"
          />
          
          {/* Dots for each data point */}
          {showDots && systolicPoints.map((point, i) => (
            <circle
              key={`systolic-${i}`}
              cx={point.x}
              cy={point.y}
              r={lineWidth}
              fill={color}
            />
          ))}
          
          {/* Dots for each data point */}
          {showDots && diastolicPoints.map((point, i) => (
            <circle
              key={`diastolic-${i}`}
              cx={point.x}
              cy={point.y}
              r={lineWidth}
              fill={`${color}80`}
            />
          ))}
        </svg>
      );
    }
    
    // Regular line chart
    return (
      <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
        <path
          d={generatePath(points)}
          fill="none"
          stroke={color}
          strokeWidth={lineWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Dots for each data point */}
        {showDots && points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={lineWidth}
            fill={color}
          />
        ))}
      </svg>
    );
  };
  
  // Calculate the change text and color
  const formatChange = (metric: MetricKey) => {
    const data = healthMetrics[metric];
    const changePercent = data.changePercent;
    const isPositive = changePercent > 0;
    const isNegative = changePercent < 0;
    
    const changeText = isNegative 
      ? `${Math.abs(changePercent).toFixed(1)}% کاهش` 
      : isPositive 
        ? `${changePercent.toFixed(1)}% افزایش` 
        : "بدون تغییر";
    
    let changeColor;
    if (data.trend === "increasing") {
      changeColor = isPositive ? "text-green-600" : "text-red-600";
    } else if (data.trend === "decreasing") {
      changeColor = isNegative ? "text-green-600" : "text-red-600";
    } else {
      changeColor = "text-amber-600";
    }
    
    return { text: changeText, color: changeColor };
  };

  // Display current value based on metric
  const formatCurrentValue = (metric: MetricKey) => {
    const data = healthMetrics[metric];
    
    if (metric === "bloodPressure") {
      const bp = data.current as { systolic: number, diastolic: number };
      return `${bp.systolic}/${bp.diastolic} ${data.unit}`;
    }
    
    return `${data.current} ${data.unit}`;
  };
  
  // Display target value based on metric
  const formatTargetValue = (metric: MetricKey) => {
    const data = healthMetrics[metric];
    const target = data.target;
    
    if (typeof target === 'number') {
      return `هدف: ${target} ${data.unit}`;
    } else if (typeof target === 'object') {
      if ('systolic' in target) {
        // Blood pressure
        const systolic = target.systolic as { min: number, max: number };
        const diastolic = target.diastolic as { min: number, max: number };
        return `هدف: ${systolic.min}-${systolic.max}/${diastolic.min}-${diastolic.max} ${data.unit}`;
      } else if ('min' in target && 'max' in target) {
        // Range target
        return `هدف: ${target.min}-${target.max} ${data.unit}`;
      }
    }
    
    return "";
  };
  
  // Render the chart based on metric
  const renderChart = (metric: MetricKey) => {
    const data = healthMetrics[metric];
    
    // Handle blood pressure specially
    if (metric === "bloodPressure") {
      return (
        <SimpleLineChart 
          data={data.history as { systolic: number, diastolic: number }[]} 
          color="#ef4444"
        />
      );
    }
    
    return (
      <SimpleLineChart 
        data={data.history as number[]} 
        color={
          metric === "weight" ? "#c19a48" :
          metric === "bloodSugar" ? "#ef4444" :
          metric === "calorieIntake" ? "#f59e0b" :
          metric === "activityLevel" ? "#10b981" :
          metric === "waterIntake" ? "#3b82f6" :
          "#c19a48"
        }
      />
    );
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">روند سلامتی شما</CardTitle>
          <CardDescription>
            اطلاعات سلامتی شما در هفته گذشته و توصیه‌های بهبود
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="metrics" className="w-full">
          <div className="px-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="metrics">شاخص‌های سلامتی</TabsTrigger>
              <TabsTrigger value="recommendations">توصیه‌های بهبود</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="metrics" className="pt-2">
            <CardContent className="p-0">
              {/* Metric selection pills */}
              <div className="px-6 pb-4 pt-2 flex flex-wrap gap-2">
                {(Object.keys(healthMetrics) as MetricKey[]).map((metric) => (
                  <Button
                    key={metric}
                    variant={selectedMetric === metric ? "default" : "outline"}
                    size="sm"
                    className={selectedMetric === metric ? "bg-[#c19a48] hover:bg-[#a17c34]" : ""}
                    onClick={() => setSelectedMetric(metric)}
                  >
                    {getMetricIcon(metric)}
                    <span className="mr-1">
                      {metric === "weight" ? "وزن" :
                      metric === "bloodSugar" ? "قند خون" :
                      metric === "bloodPressure" ? "فشار خون" :
                      metric === "calorieIntake" ? "دریافت کالری" :
                      metric === "activityLevel" ? "فعالیت بدنی" :
                      metric === "waterIntake" ? "مصرف آب" :
                      metric}
                    </span>
                  </Button>
                ))}
              </div>
              
              {/* Selected metric details */}
              <div className="border-t pt-4 pb-2 px-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center">
                      {getMetricIcon(selectedMetric)}
                      <span className="mr-2">
                        {selectedMetric === "weight" ? "وزن" :
                        selectedMetric === "bloodSugar" ? "قند خون" :
                        selectedMetric === "bloodPressure" ? "فشار خون" :
                        selectedMetric === "calorieIntake" ? "دریافت کالری" :
                        selectedMetric === "activityLevel" ? "فعالیت بدنی" :
                        selectedMetric === "waterIntake" ? "مصرف آب" :
                        selectedMetric}
                      </span>
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">{formatTargetValue(selectedMetric)}</p>
                  </div>
                  
                  <div className="text-left">
                    <div className="text-2xl font-bold">
                      {formatCurrentValue(selectedMetric)}
                    </div>
                    <div className={`text-sm flex items-center gap-1 ${formatChange(selectedMetric).color}`}>
                      {getTrendIcon(healthMetrics[selectedMetric].trend)}
                      <span>{formatChange(selectedMetric).text}</span>
                    </div>
                  </div>
                </div>
                
                {/* Chart */}
                <div className="h-16 mb-4">
                  {renderChart(selectedMetric)}
                </div>
                
                {/* Progress bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>پیشرفت به سمت هدف</span>
                    <span>{calculateProgress(selectedMetric)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full">
                    <div 
                      className="bg-[#c19a48] h-2 rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${calculateProgress(selectedMetric)}%` }}
                    />
                  </div>
                </div>
                
                {/* Assessment */}
                <div className="mt-4">
                  {healthMetrics[selectedMetric].assessments.map((assessment, index) => (
                    <div key={index} className={`rounded-md p-3 ${getStatusColor(assessment.status)}`}>
                      {assessment.message}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <CardContent>
              <div className="space-y-4">
                {healthRecommendations.map((recommendation) => (
                  <div 
                    key={recommendation.id}
                    className="border rounded-md p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-slate-100">
                        {recommendation.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{recommendation.title}</h3>
                          <Badge
                            className={
                              recommendation.priority === "high" 
                                ? "bg-red-100 text-red-800 border-red-200" 
                                : recommendation.priority === "medium"
                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                : "bg-blue-100 text-blue-800 border-blue-200"
                            }
                          >
                            {recommendation.priority === "high" ? "اولویت بالا" : 
                             recommendation.priority === "medium" ? "اولویت متوسط" : 
                             "اولویت عادی"}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-2">{recommendation.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
} 