import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Activity, Utensils, Pill, Calendar, Brain, Droplets, Heart, List, Check, Clock, RotateCcw, CheckCircle, Info, Pencil, Trash2
} from "lucide-react";
import { DashboardTask, TrackingTask, FutureTask, GoalOrRecommendationTask } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: DashboardTask;
  onToggleComplete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  className?: string;
  isPendingUndo?: boolean;
  onUndo?: (taskId: string) => void;
}

// Helper function to get category icon
const getCategoryIcon = (category: DashboardTask['category']) => {
  switch (category) {
    case 'measurement': return <Activity className="h-4 w-4" />;
    case 'medication': return <Pill className="h-4 w-4" />;
    case 'nutrition': return <Utensils className="h-4 w-4" />;
    case 'activity': return <Activity className="h-4 w-4" />;
    case 'appointment': return <Calendar className="h-4 w-4" />;
    case 'lifestyle': return <Droplets className="h-4 w-4" />;
    case 'goal': return <Heart className="h-4 w-4" />;
    case 'mental': return <Brain className="h-4 w-4" />;
    default: return <List className="h-4 w-4" />;
  }
};

// Helper function to get priority style
const getPriorityStyle = (priority: DashboardTask['priority']) => {
  switch (priority) {
    case "high": return "border-red-500 bg-red-50 text-red-700";
    case "medium": return "border-amber-500 bg-amber-50 text-amber-700";
    case "low": return "border-blue-500 bg-blue-50 text-blue-700";
    default: return "border-slate-300 bg-slate-50 text-slate-600";
  }
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onEdit, onDelete, className, isPendingUndo = false, onUndo }) => {

  const isTrackingTask = (t: DashboardTask): t is TrackingTask => t.category === 'measurement';
  const isFutureTask = (t: DashboardTask): t is FutureTask => [
    'appointment', 'medication', 'activity', 'lifestyle', 'other'
  ].includes(t.category) && 'scheduledTime' in t;
  const isGoalOrRecommendation = (t: DashboardTask): t is GoalOrRecommendationTask => [
    'nutrition', 'activity', 'lifestyle', 'goal', 'mental'
  ].includes(t.category) && 'description' in t;

  const displayDetails = () => {
    if ('details' in task && task.details) return task.details;
    if ('description' in task && task.description) return task.description;
    if ('frequency' in task && task.frequency) return `تکرار: ${task.frequency}`;
    return null;
  };

  const detailText = displayDetails();

  return (
    <Card className={cn(
      "transition-colors hover:bg-slate-50", 
      task.isCompleted ? "bg-green-50/70 border-green-200 opacity-70" : "bg-white",
      isPendingUndo && "ring-2 ring-offset-1 ring-blue-400",
      className
    )}>
      <CardContent className="p-4 flex items-start gap-4 relative">
        {isPendingUndo && onUndo && (
          <div className="absolute inset-0 bg-blue-50/80 flex items-center justify-center z-10 rounded-md">
              <Button 
                variant="outline"
                size="sm"
                className="bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                onClick={() => onUndo(task.id)}
              >
                  <RotateCcw className="h-4 w-4 ml-1" />
                  لغو
              </Button>
          </div>
        )}

        <Checkbox 
          id={`task-${task.id}`}
          checked={task.isCompleted}
          onCheckedChange={() => onToggleComplete(task.id)}
          className={cn("mt-1", isPendingUndo && "opacity-50 cursor-not-allowed")}
          aria-labelledby={`task-title-${task.id}`}
          disabled={isPendingUndo}
        />
        
        <div className={cn("flex-1", isPendingUndo && "opacity-60")}>
          <div className="flex justify-between items-center mb-1">
            <h3 id={`task-title-${task.id}`} className={cn("font-medium", task.isCompleted && "line-through text-slate-500")}>
              {task.title}
            </h3>
            <Badge variant="outline" className={cn("text-xs", getPriorityStyle(task.priority))}>
              {task.priority}
            </Badge>
          </div>
          
          {isTrackingTask(task) && (
            <p className="text-sm text-slate-500">
              اندازه‌گیری: {task.frequency} {task.normalRange ? `(محدوده: ${task.normalRange})` : ''}
            </p>
          )}
          {isFutureTask(task) && (
            <div className="text-sm text-slate-500 flex items-center gap-1">
               <Clock className="h-3 w-3" /> 
               {task.dueDate?.toLocaleDateString('fa-IR')} {task.scheduledTime}
               {task.details && <span className="text-xs">({task.details})</span>}
            </div>
          )}
          {isGoalOrRecommendation(task) && (
            <p className="text-sm text-slate-600 mt-1">
              {task.description}
            </p>
          )}
          
          {!isFutureTask(task) && task.dueDate && (
             <p className="text-xs text-slate-400 mt-1">
               مهلت: {task.dueDate.toLocaleDateString('fa-IR')}
             </p>
          )}
          
          {isGoalOrRecommendation(task) && !task.isCompleted && (
            <div className="mt-2 text-right">
                <Button variant="link" size="sm" className="text-[#c19a48] h-auto p-0">
                    {task.actionText}
                </Button>
            </div>
          )}
        </div>
        
        <div className={cn("p-2 rounded-full bg-slate-100", task.isCompleted && "bg-green-100", isPendingUndo && "opacity-60")}>
          {getCategoryIcon(task.category)}
        </div>

        <div className="flex items-center gap-1">
          {!task.isCompleted && !isPendingUndo && (
            <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-500 hover:text-slate-700 hover:bg-slate-100" onClick={() => onEdit(task.id)} title="ویرایش">
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          )}
          {!task.isCompleted && !isPendingUndo && (
            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-100" onClick={() => onDelete(task.id)} title="حذف">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
          {isPendingUndo ? (
            <Button variant="ghost" size="sm" className="h-6 text-xs px-1.5 text-amber-700 hover:bg-amber-100" onClick={() => onUndo && onUndo(task.id)}>
              <RotateCcw className="h-3 w-3 ml-1" /> لغو
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className={cn(
              "h-6 w-6 rounded-full",
              task.isCompleted 
                ? "text-green-600 hover:bg-green-100"
                : "text-slate-400 hover:text-green-600 hover:bg-green-100"
            )} onClick={() => onToggleComplete(task.id)} title={task.isCompleted ? "لغو انجام" : "انجام شد"}>
              <CheckCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 