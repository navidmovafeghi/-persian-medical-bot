"use client";

import { 
  Calendar, 
  Pill, 
  UserRound,
  Clock,
  Activity,
  Heart,
  List,
  MessageSquare,
  PlusCircle,
  LayoutDashboard,
  CheckCircle,
  ListChecks,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Trophy,
  Settings
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskCard } from "@/components/dashboard/task-card";
import { DashboardTask, TrackingTask, FutureTask, GoalOrRecommendationTask, HealthMetric, MetricHistoryPoint, DashboardData, Achievement } from "@/types/dashboard";
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AchievementItem } from "@/components/dashboard/achievement-item";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TaskForm } from "@/components/dashboard/task-form";
import { v4 as uuidv4 } from 'uuid';
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Suspense } from 'react';
import { lazyComponent } from '@/utils/code-splitting';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy-loaded components
const DashboardStats = lazyComponent(() => import('@/components/dashboard/Stats'));
const HealthMetricsChart = lazyComponent(() => import('@/components/dashboard/HealthMetricsChart'));
const RecentMedications = lazyComponent(() => import('@/components/dashboard/RecentMedications'));
const UpcomingAppointments = lazyComponent(() => import('@/components/dashboard/UpcomingAppointments'));

// Loading placeholders
const StatsLoading = () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg" />;
const ChartLoading = () => <div className="h-80 bg-gray-100 animate-pulse rounded-lg" />;
const ListLoading = () => (
  <div className="space-y-2">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg" />
    ))}
  </div>
);

// Temporary placeholder date for calculations - Moved up
const today = new Date(); 

// Sample Metric Data (More detailed) - Uses today
const sampleMetrics: HealthMetric[] = [
  {
    id: 'bloodSugar', name: 'قند خون', unit: 'mg/dL', currentValue: 102,
    targetValue: { min: 70, max: 100 }, status: 'warning', trend: 'decreasing',
    history: [
        { date: new Date(new Date().setDate(today.getDate() - 6)), value: 110 },
        { date: new Date(new Date().setDate(today.getDate() - 5)), value: 108 },
        { date: new Date(new Date().setDate(today.getDate() - 4)), value: 105 },
        { date: new Date(new Date().setDate(today.getDate() - 3)), value: 103 },
        { date: new Date(new Date().setDate(today.getDate() - 2)), value: 104 },
        { date: new Date(new Date().setDate(today.getDate() - 1)), value: 102 },
    ],
    lastUpdated: new Date(new Date().setDate(today.getDate() - 1))
  },
  {
    id: 'bloodPressure', name: 'فشار خون', unit: 'mmHg', currentValue: { systolic: 120, diastolic: 80 },
    targetValue: { systolic: { min: 90, max: 120 }, diastolic: { min: 60, max: 80 } }, status: 'normal', trend: 'stable',
    history: [
        { date: new Date(new Date().setDate(today.getDate() - 6)), value: { systolic: 125, diastolic: 82 } },
        { date: new Date(new Date().setDate(today.getDate() - 5)), value: { systolic: 123, diastolic: 83 } },
        { date: new Date(new Date().setDate(today.getDate() - 4)), value: { systolic: 122, diastolic: 81 } },
        { date: new Date(new Date().setDate(today.getDate() - 3)), value: { systolic: 121, diastolic: 81 } },
        { date: new Date(new Date().setDate(today.getDate() - 2)), value: { systolic: 120, diastolic: 80 } },
        { date: new Date(new Date().setDate(today.getDate() - 1)), value: { systolic: 120, diastolic: 80 } },
    ],
     lastUpdated: new Date(new Date().setDate(today.getDate() - 1))
  },
  {
    id: 'weight', name: 'وزن', unit: 'کیلوگرم', currentValue: 78,
    targetValue: 75, status: 'warning', trend: 'stable',
    history: [
        { date: new Date(new Date().setDate(today.getDate() - 42)), value: 79.5 }, // 6 weeks ago
        { date: new Date(new Date().setDate(today.getDate() - 21)), value: 78.8 }, // 3 weeks ago
        { date: new Date(new Date().setDate(today.getDate() - 7)), value: 78.2 }, // 1 week ago
        { date: new Date(new Date().setDate(today.getDate() - 1)), value: 78 },   // Yesterday
    ],
     lastUpdated: new Date(new Date().setDate(today.getDate() - 1))
  },
   {
    id: 'activity', name: 'فعالیت', unit: 'قدم', currentValue: 7500,
    targetValue: 10000, status: 'warning', trend: 'increasing',
    history: [
        { date: new Date(new Date().setDate(today.getDate() - 6)), value: 5200 },
        { date: new Date(new Date().setDate(today.getDate() - 3)), value: 7100 },
        { date: new Date(new Date().setDate(today.getDate() - 1)), value: 7500 },
    ],
     lastUpdated: new Date(new Date().setDate(today.getDate() - 1))
  },
    {
    id: 'waterIntake', name: 'مصرف آب', unit: 'لیتر', currentValue: 1.8,
    targetValue: 2.5, status: 'warning', trend: 'increasing',
    history: [
        { date: new Date(new Date().setDate(today.getDate() - 6)), value: 1.2 },
        { date: new Date(new Date().setDate(today.getDate() - 3)), value: 1.5 },
        { date: new Date(new Date().setDate(today.getDate() - 1)), value: 1.8 },
    ],
     lastUpdated: new Date(new Date().setDate(today.getDate() - 1))
  }
];

// Sample Achievement Data
const sampleAchievements: Achievement[] = [
    {
        id: 'med-streak-7', title: 'رعایت دارویی - ۷ روز', 
        description: 'شما ۷ روز متوالی داروهای خود را به موقع مصرف کرده‌اید!',
        icon: 'Repeat', isAchieved: true, achievedDate: new Date(new Date().setDate(today.getDate() - 1)),
        category: 'streak'
    },
    {
        id: 'activity-goal-1', title: 'هدف فعالیت هفتگی', 
        description: 'رسیدن به هدف ۱۰۰۰۰ قدم در ۵ روز هفته.',
        icon: 'Target', isAchieved: false,
        category: 'goal'
    },
     {
        id: 'weight-milestone-1', title: 'کاهش وزن - ۱ کیلوگرم', 
        description: 'اولین گام در مسیر کاهش وزن برداشته شد.',
        icon: 'Trophy', isAchieved: false, // Assume not achieved yet
        category: 'milestone'
    },
     {
        id: 'log-consistency-3', title: 'ثبت مداوم - ۳ روز', 
        description: 'شما ۳ روز متوالی اطلاعات سلامتی خود را ثبت کرده‌اید.',
        icon: 'Activity', isAchieved: true, achievedDate: new Date(),
        category: 'consistency'
    },
];

const LOCAL_STORAGE_COMPLETED_TASKS_KEY = 'completedTaskIds';
const LOCAL_STORAGE_SELECTED_METRICS_KEY = 'selectedMetricIds';
const LOCAL_STORAGE_SELECTED_TIME_RANGE_KEY = 'selectedTimeRange';

const UNDO_TIMEOUT_MS = 5000; // 5 seconds for undo

type TimeRange = 'week' | 'month' | 'year' | 'all';

// --- Personalization Logic Placeholder --- 

/** 
 * Generates personalized tasks based on user's health metrics.
 * TODO: Replace this placeholder with actual LLM-driven or rule-based personalization.
 */
const generatePersonalizedTasks = (metrics: HealthMetric[]): DashboardTask[] => {
    const generatedTasks: DashboardTask[] = [];
    const today = new Date();

    // Example 1: Blood Sugar Warning
    const bloodSugar = metrics.find(m => m.id === 'bloodSugar');
    if (bloodSugar && bloodSugar.status === 'warning') {
        generatedTasks.push({
            id: 'gen-task-glucose', title: 'اندازه‌گیری قند خون (ناشتا)', category: 'measurement',
            priority: 'high', isCompleted: false, dueDate: new Date(), 
            metricId: 'bloodSugar', frequency: 'روزانه', normalRange: '70-100 mg/dL',
            notes: 'قند خون شما کمی بالاست، لطفاً روزانه چک کنید.'
        });
    }

    // Example 2: Weight Goal / Warning
    const weight = metrics.find(m => m.id === 'weight');
    if (weight && weight.targetValue && weight.status === 'warning') {
         generatedTasks.push({
            id: 'gen-task-weight-measure', title: 'اندازه‌گیری وزن', category: 'measurement',
            priority: 'medium', isCompleted: false, dueDate: new Date(today.setDate(today.getDate() + (7 - today.getDay()))), // Next Sunday
            metricId: 'weight', frequency: 'هفتگی', normalRange: 'BMI: 18.5-24.9'
        });
         generatedTasks.push({
            id: 'gen-task-weight-goal', title: 'تمرکز بر هدف وزنی', category: 'goal',
            priority: 'medium', isCompleted: false,
            description: `هدف فعلی ${weight.targetValue} کیلوگرم است. رژیم و فعالیت را ادامه دهید.`, 
            actionText: 'مشاهده برنامه غذایی' // Placeholder action
        });
    }
    
    // Example 3: Activity Goal
    const activity = metrics.find(m => m.id === 'activity');
    if (activity && typeof activity.currentValue === 'number' && typeof activity.targetValue === 'number' && activity.currentValue < activity.targetValue) {
        generatedTasks.push({
            id: 'gen-task-activity', title: 'افزایش فعالیت روزانه', category: 'activity',
            priority: 'medium', isCompleted: false, dueDate: new Date(),
            description: `هدف ${activity.targetValue} قدم است. امروز ${activity.targetValue - activity.currentValue} قدم دیگر لازم است.`, 
            actionText: 'شروع پیاده‌روی'
        });
    }

    // Example 4: Stable Blood Pressure Reminder (less frequent check)
    const bloodPressure = metrics.find(m => m.id === 'bloodPressure');
    if (bloodPressure && bloodPressure.status === 'normal' && bloodPressure.trend === 'stable') {
        generatedTasks.push({
            id: 'gen-task-bp-stable', title: 'اندازه‌گیری فشار خون (هفتگی)', category: 'measurement',
            priority: 'low', isCompleted: false, dueDate: new Date(today.setDate(today.getDate() + (7 - today.getDay()))), // Next Sunday
            metricId: 'bloodPressure', frequency: 'هفتگی', normalRange: 'زیر ۱۲۰/۸۰ mmHg'
        });
    }
    
    // Add a static medication reminder example (could also be generated)
    generatedTasks.push({
        id: 'static-task-med-am', title: 'مصرف متفورمین (صبح)', category: 'medication',
        priority: 'high', isCompleted: false, dueDate: new Date(), 
        scheduledTime: 'بعد از صبحانه', details: '۵۰۰ میلی‌گرم'
      });

    return generatedTasks;
};

export default function DashboardPage() {
  const persianDate = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  }).format(today);

  // --- State Management --- 
  const [tasks, setTasks] = useState<DashboardTask[]>([]);
  const [isMetricModalOpen, setIsMetricModalOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData>(() => {
      // Load selectedMetricIds from localStorage or use default
      const storedMetricIdsString = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_SELECTED_METRICS_KEY) : null;
      const initialSelectedIds = storedMetricIdsString 
          ? JSON.parse(storedMetricIdsString) 
          : ['bloodSugar', 'bloodPressure', 'weight', 'activity']; // Default

      // Initial load - tasks will be generated in useEffect
      return {
          user: { name: "علی", avatarUrl: "/placeholder-avatar.jpg" },
          currentDate: today,
          allMetrics: sampleMetrics,
          selectedMetricIds: initialSelectedIds,
          tasks: [], // Start empty, generated in useEffect
          achievements: sampleAchievements
      };
  });

  const [pendingUndo, setPendingUndo] = useState<{ taskId: string; timeoutId: NodeJS.Timeout } | null>(null);
  const taskStateBeforeUndo = useRef<DashboardTask[]>([]);
  
  // Load selectedTimeRange from localStorage or use default
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(() => {
      if (typeof window === 'undefined') return 'month'; // Default for SSR
      const storedTimeRange = localStorage.getItem(LOCAL_STORAGE_SELECTED_TIME_RANGE_KEY) as TimeRange | null;
      return storedTimeRange || 'month'; // Default to 'month'
  }); 

  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false); 
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false); // State for Edit Task Dialog
  const [taskToEdit, setTaskToEdit] = useState<DashboardTask | null>(null); // State for task being edited
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for Delete Confirmation Dialog
  const [taskToDeleteId, setTaskToDeleteId] = useState<string | null>(null); // State for task ID pending deletion

  // Load initial tasks (GENERATED) and apply completion status
  useEffect(() => {
    // Generate tasks based on the initial metrics
    const generated = generatePersonalizedTasks(dashboardData.allMetrics);

    const storedCompletedIdsString = localStorage.getItem(LOCAL_STORAGE_COMPLETED_TASKS_KEY);
    const completedIds = storedCompletedIdsString ? JSON.parse(storedCompletedIdsString) : [];

    // Apply completion status to the generated tasks
    const initialTasks = generated.map(task => ({
      ...task,
      isCompleted: completedIds.includes(task.id)
    }));

    setDashboardData(prevData => ({ ...prevData, tasks: initialTasks }));
    setTasks(initialTasks);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // --- Persistence Effects ---

  // Persist selectedMetricIds
  useEffect(() => {
      if (dashboardData.selectedMetricIds) {
          localStorage.setItem(LOCAL_STORAGE_SELECTED_METRICS_KEY, JSON.stringify(dashboardData.selectedMetricIds));
      }
  }, [dashboardData.selectedMetricIds]);

  // Persist selectedTimeRange
  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_SELECTED_TIME_RANGE_KEY, selectedTimeRange);
  }, [selectedTimeRange]);

  // Clear undo timeout on component unmount (remains the same)
  useEffect(() => {
    return () => { if (pendingUndo) clearTimeout(pendingUndo.timeoutId); };
  }, [pendingUndo]);

  // Function to apply task change (updates both tasks and dashboardData.tasks)
   const applyTaskChange = (taskId: string, newCompletedStatus: boolean) => {
    let finalUpdatedTasks: DashboardTask[] = [];
    setTasks(currentTasks => {
      finalUpdatedTasks = currentTasks.map(task => 
          task.id === taskId ? { ...task, isCompleted: newCompletedStatus } : task
      );
       // Update localStorage
      const completedIds = finalUpdatedTasks
        .filter(task => task.isCompleted)
        .map(task => task.id);
      localStorage.setItem(LOCAL_STORAGE_COMPLETED_TASKS_KEY, JSON.stringify(completedIds));
      // Update tasks in dashboardData as well
      setDashboardData(prevData => ({ ...prevData, tasks: finalUpdatedTasks }));
      return finalUpdatedTasks;
    });
    console.log(`Applied completion change for task: ${taskId}`);
    setPendingUndo(null); 
  };

  // Toggle completion handler (initiates undo)
  const handleToggleComplete = (taskId: string) => {
      if (pendingUndo) {
        clearTimeout(pendingUndo.timeoutId);
        setPendingUndo(null);
    }
    taskStateBeforeUndo.current = tasks; 
    const taskToToggle = tasks.find(task => task.id === taskId);
    if (!taskToToggle) return;
    const newCompletedStatus = !taskToToggle.isCompleted;
    const timeoutId = setTimeout(() => {
        applyTaskChange(taskId, newCompletedStatus);
    }, UNDO_TIMEOUT_MS);
    setPendingUndo({ taskId, timeoutId });
    console.log(`Initiated toggle for task: ${taskId}.`);
  };

  // Undo handler (reverts both tasks and dashboardData.tasks)
  const handleUndo = (taskId: string) => {
    if (pendingUndo && pendingUndo.taskId === taskId) {
        clearTimeout(pendingUndo.timeoutId); 
        setTasks(taskStateBeforeUndo.current); // Revert tasks state
        setDashboardData(prevData => ({ ...prevData, tasks: taskStateBeforeUndo.current })); // Revert in dashboardData
        setPendingUndo(null); 
        console.log(`Undo toggled completion for task: ${taskId}`);
    }
  };

  // Handle Add Task Submission (This function needs to be present)
  const handleAddTask = (newTaskData: Omit<DashboardTask, 'id' | 'isCompleted'>) => {
      // Create a base task object with required fields and default/placeholder values
      // for fields specific to certain task types to satisfy the union type.
      const newTask: DashboardTask = {
          id: uuidv4(), 
          isCompleted: false,
          ...newTaskData, // Spread the data from the form
          
          // Add placeholder/default values for fields required by specific types
          // These might need refinement or proper handling later based on category
          metricId: newTaskData.category === 'measurement' ? 'placeholder_metric' : undefined, // Required by TrackingTask
          frequency: newTaskData.category === 'measurement' ? 'روزانه' : undefined, // Required by TrackingTask
          description: newTaskData.category === 'goal' || newTaskData.category === 'nutrition' ? 'توضیحات پیش فرض' : undefined, // Required by GoalOrRecommendationTask
          actionText: newTaskData.category === 'goal' || newTaskData.category === 'nutrition' ? 'اقدام پیش فرض' : undefined, // Required by GoalOrRecommendationTask
      } as DashboardTask;
      
      // Add to both state variables
      setTasks(currentTasks => [...currentTasks, newTask]);
      setDashboardData(prevData => ({ 
          ...prevData, 
          tasks: [...prevData.tasks, newTask] 
      }));
      
      console.log("Added Task:", newTask);
      setIsAddTaskDialogOpen(false); // Close the dialog
  };

  // Handle Opening the Edit Dialog
  const handleOpenEditDialog = (taskId: string) => {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
          setTaskToEdit(task);
          setIsEditTaskDialogOpen(true);
          console.log("Editing Task:", task);
      } else {
          console.error("Task not found for editing:", taskId);
      }
  };

  // Handle Edit Task Submission
  const handleEditTask = (updatedTaskData: Omit<DashboardTask, 'id' | 'isCompleted'>) => {
      if (!taskToEdit) return; 

      const updatedTask: DashboardTask = {
          ...taskToEdit, // Keep original id and isCompleted status
          ...updatedTaskData, // Apply changes from form
          // Re-apply placeholder/default values logic similar to handleAddTask
          // to ensure type correctness based on the *potentially changed* category
          metricId: updatedTaskData.category === 'measurement' ? (taskToEdit as TrackingTask)?.metricId || 'placeholder_metric' : undefined, 
          frequency: updatedTaskData.category === 'measurement' ? (taskToEdit as TrackingTask)?.frequency || 'روزانه' : undefined, 
          description: updatedTaskData.category === 'goal' || updatedTaskData.category === 'nutrition' ? (taskToEdit as GoalOrRecommendationTask)?.description || 'توضیحات پیش فرض' : undefined,
          actionText: updatedTaskData.category === 'goal' || updatedTaskData.category === 'nutrition' ? (taskToEdit as GoalOrRecommendationTask)?.actionText || 'اقدام پیش فرض' : undefined,
      } as DashboardTask;

      // Update both state variables
      setTasks(currentTasks => 
          currentTasks.map(t => t.id === taskToEdit.id ? updatedTask : t)
      );
      setDashboardData(prevData => ({ 
          ...prevData, 
          tasks: prevData.tasks.map(t => t.id === taskToEdit.id ? updatedTask : t)
      }));

      console.log("Updated Task:", updatedTask);
      setIsEditTaskDialogOpen(false); // Close the dialog
      setTaskToEdit(null); // Reset task being edited
  };

  // Handle Opening Delete Confirmation
  const handleOpenDeleteDialog = (taskId: string) => {
      console.log("Requesting delete confirmation for Task:", taskId);
      setTaskToDeleteId(taskId);
      setIsDeleteDialogOpen(true);
  };

  // Handle Confirming Task Deletion
  const confirmDeleteTask = () => {
      if (!taskToDeleteId) return;
      
      console.log("Confirmed Deleting Task:", taskToDeleteId);

      const taskWasCompleted = tasks.find(t => t.id === taskToDeleteId)?.isCompleted || false;

      // Remove from both state variables
      setTasks(currentTasks => currentTasks.filter(t => t.id !== taskToDeleteId));
      setDashboardData(prevData => ({ 
          ...prevData, 
          tasks: prevData.tasks.filter(t => t.id !== taskToDeleteId) 
      }));

      // Update localStorage for completed tasks if the deleted task was completed
      if (taskWasCompleted) {
           const storedCompletedIdsString = localStorage.getItem(LOCAL_STORAGE_COMPLETED_TASKS_KEY);
          if (storedCompletedIdsString) {
              let completedIds = JSON.parse(storedCompletedIdsString);
              if (completedIds.includes(taskToDeleteId)) {
                  completedIds = completedIds.filter((id: string) => id !== taskToDeleteId);
                  localStorage.setItem(LOCAL_STORAGE_COMPLETED_TASKS_KEY, JSON.stringify(completedIds));
              }
          }
      }
      
      // Close dialog and reset state
      setIsDeleteDialogOpen(false);
      setTaskToDeleteId(null);
  };

 // --- Sorting and Filtering Logic (using tasks state) --- 
  const priorityOrder: Record<DashboardTask['priority'], number> = { 'high': 1, 'medium': 2, 'low': 3, 'optional': 4 };
  const sortTasks = (taskList: DashboardTask[]) => {
      // Ensure taskList is always an array before sorting
    const listToSort = Array.isArray(taskList) ? taskList : [];
     return [...listToSort].sort((a, b) => { // Use spread to avoid mutating original array directly if needed elsewhere
      if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return (a.dueDate?.getTime() ?? Infinity) - (b.dueDate?.getTime() ?? Infinity);
    });
  };
  // Ensure tasks used in filters is always an array
  const currentTasks = Array.isArray(tasks) ? tasks : [];
  const todayTasks = sortTasks(currentTasks.filter(task => task.dueDate && task.dueDate.toDateString() === today.toDateString()));
  const upcomingTasks = sortTasks(currentTasks.filter(task => task.dueDate && task.dueDate > today));
  const measurementTasks = sortTasks(currentTasks.filter(task => task.category === 'measurement'));
  const recommendations = sortTasks(currentTasks.filter(task => ['nutrition', 'activity', 'lifestyle', 'goal', 'mental'].includes(task.category)));
  
  // --- Helper Functions --- 

   // Get Trend Icon
  const getTrendIcon = (trend?: 'increasing' | 'decreasing' | 'stable') => {
    switch(trend) {
      case "increasing": return <ArrowUp className="h-3 w-3 text-green-500" />;
      case "decreasing": return <ArrowDown className="h-3 w-3 text-red-500" />;
      case "stable": return <ArrowRight className="h-3 w-3 text-amber-500" />;
      default: return null;
    }
  };

  // Get Status Indicator Style
  const getStatusIndicatorClass = (status?: 'good' | 'warning' | 'danger' | 'normal') => {
    switch(status) {
      case "good": case "normal": return "bg-green-500";
      case "warning": return "bg-amber-500";
      case "danger": return "bg-red-500";
      default: return "bg-slate-400";
    }
  };

  // Calculate Progress Percentage (simplified version)
  const calculateMetricProgress = (metric: HealthMetric): number | null => {
    if (!metric.targetValue || typeof metric.currentValue !== 'number' || typeof metric.targetValue !== 'number') {
      // Handle BP, range targets, or missing targets - return null for now
      // More complex logic needed for these cases
      if (metric.id === 'bloodPressure') return null; // No simple progress for BP
      if (typeof metric.targetValue === 'object' && metric.targetValue !== null && ('min' in metric.targetValue || 'systolic' in metric.targetValue) ) return null; // No simple progress for ranges yet
      if (typeof metric.currentValue !== 'number' || typeof metric.targetValue !== 'number') return null; // Ensure numeric comparison
    }
    
    const target = metric.targetValue as number;
    const current = metric.currentValue as number;
    
    // Avoid division by zero if target is 0 or current equals target
    if (target === 0) return current === 0 ? 100 : null;
    if (current === target) return 100;

    // Simple percentage towards target (assumes target is the goal, not a limit)
    // This might need adjustment based on whether higher or lower is better
    let progress = (current / target) * 100;

    // If the goal is to decrease (e.g., weight loss) and current > target
    // A more intuitive progress might be how much of the excess is reduced.
    // This needs initial value, which we don't have easily here. Sticking to simple % for now.
    // Example: target 75, current 78 -> progress 104%. We might want to show negative progress or % completion based on starting point.
    
    return Math.max(0, Math.min(100, progress)); // Cap progress between 0 and 100
  };

  // Filter Metric History based on Time Range
  const filterMetricHistory = (history: MetricHistoryPoint[], range: TimeRange): MetricHistoryPoint[] => {
      const now = new Date();
      let startDate: Date | null = null;

      switch(range) {
          case 'week':
              startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6); // Last 7 days including today
              break;
          case 'month':
              startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()); // Last month approx.
              break;
          case 'year':
              startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()); // Last year approx.
              break;
          case 'all':
          default:
              return history; // Return all history
      }
      
      if (!startDate) return history;
      
      return history.filter(point => point.date >= startDate! && point.date <= now)
                    .sort((a, b) => a.date.getTime() - b.date.getTime()); // Ensure sorted
  };

  // --- Rendering Logic --- 

  // Get the metrics selected for display
  const selectedMetrics = dashboardData.allMetrics.filter(metric => 
      dashboardData.selectedMetricIds.includes(metric.id)
  );

  // SparkLine component (remains the same)
   const SparkLine = ({ data, color }: { data: (number | { systolic: number; diastolic: number })[], color: string }) => {
    // Ensure data is an array before processing
    if (!Array.isArray(data) || data.length === 0) {
        return <svg className="w-16 h-6 overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none"></svg>; // Return empty SVG if no data
    }

    const values = data.flatMap(d => typeof d === 'number' ? d : [d.systolic, d.diastolic]);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1; // Avoid division by zero if all values are the same
    
    const points = data.map((_value, index) => {
        const x = (index / (data.length - 1 || 1)) * 100;
        return x;
    });

    return (
      <svg className="w-16 h-6 overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
        {data.map((value, index) => {
           // Type guard for history value
           const numericValue = typeof value === 'number' ? value : value.systolic;
           const prevHistoryPoint = index > 0 ? data[index-1] : value;
           const prevNumericValue = typeof prevHistoryPoint === 'number' ? prevHistoryPoint : prevHistoryPoint.systolic;

           const y = 20 - (((numericValue) - min) / range) * 20 * 0.8 - 2; // Adjust y calculation for viewbox
           const prevY = index > 0 ? 20 - (((prevNumericValue) - min) / range) * 20 * 0.8 - 2 : y;
           
           return (
            <React.Fragment key={index}>
                {index > 0 && (
                     <line 
                        x1={points[index-1]}
                        y1={prevY}
                        x2={points[index]}
                        y2={y}
                        stroke={color}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                )}
                 {/* Optional: Add circles for points */}
                 {/* <circle cx={points[index]} cy={y} r="1" fill={color} /> */} 
            </React.Fragment>
           )
        })}
       </svg>
    );
  };

  // Function to handle metric selection changes
  const handleMetricSelectionChange = (metricId: string, isSelected: boolean) => {
      setDashboardData(prevData => {
          const newSelectedIds = isSelected
              ? [...prevData.selectedMetricIds, metricId]
              : prevData.selectedMetricIds.filter(id => id !== metricId);
          
          // Persist to localStorage
          if (typeof window !== 'undefined') {
              localStorage.setItem(LOCAL_STORAGE_SELECTED_METRICS_KEY, JSON.stringify(newSelectedIds));
          }

          return { ...prevData, selectedMetricIds: newSelectedIds };
      });
  };

  // Filter metrics to display based on selection
  const displayedMetrics = dashboardData.allMetrics.filter(metric =>
    dashboardData.selectedMetricIds.includes(metric.id)
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">داشبورد سلامت</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats Section */}
        <ErrorBoundary fallback={<div>خطا در بارگذاری آمار</div>}>
          <Suspense fallback={<StatsLoading />}>
            <DashboardStats />
          </Suspense>
        </ErrorBoundary>
        
        {/* Health Metrics Chart */}
        <ErrorBoundary fallback={<div>خطا در بارگذاری نمودار</div>}>
          <Suspense fallback={<ChartLoading />}>
            <HealthMetricsChart />
          </Suspense>
        </ErrorBoundary>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Recent Medications */}
        <ErrorBoundary fallback={<div>خطا در بارگذاری اطلاعات دارویی</div>}>
          <Suspense fallback={<ListLoading />}>
            <RecentMedications />
          </Suspense>
        </ErrorBoundary>
        
        {/* Upcoming Appointments */}
        <ErrorBoundary fallback={<div>خطا در بارگذاری قرارهای پزشکی</div>}>
          <Suspense fallback={<ListLoading />}>
            <UpcomingAppointments />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}