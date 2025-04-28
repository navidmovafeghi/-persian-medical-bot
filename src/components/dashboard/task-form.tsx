"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
    DashboardTask, 
    TaskCategory, 
    TaskPriority, 
    TrackingTask, 
    FutureTask, 
    GoalOrRecommendationTask, 
    HealthMetric
} from '@/types/dashboard';

interface TaskFormProps {
    onSubmit: (taskData: Omit<DashboardTask, 'id' | 'isCompleted'>) => void;
    onCancel: () => void;
    initialData?: Partial<DashboardTask>; // For editing
    availableMetrics: HealthMetric[]; // Add prop for available metrics
}

const taskCategories: TaskCategory[] = ['measurement', 'medication', 'activity', 'nutrition', 'lifestyle', 'goal', 'mental', 'appointment', 'other'];
const taskPriorities: TaskPriority[] = ['high', 'medium', 'low', 'optional'];

// Helper function to check if a task is a TrackingTask (can be moved to utils)
const isTrackingTask = (task: Partial<DashboardTask>): task is Partial<TrackingTask> => task.category === 'measurement';
// Helper function to check if a task is a GoalOrRecommendationTask (can be moved to utils)
const isGoalOrRecommendationTask = (task: Partial<DashboardTask>): task is Partial<GoalOrRecommendationTask> => 
    task.category === 'nutrition' || task.category === 'activity' || task.category === 'lifestyle' || task.category === 'goal' || task.category === 'mental';

export function TaskForm({ onSubmit, onCancel, initialData, availableMetrics }: TaskFormProps) {
    // Base fields
    const [title, setTitle] = useState(initialData?.title || '');
    const initialCategory = initialData?.category && taskCategories.includes(initialData.category) ? initialData.category : 'measurement';
    const [category, setCategory] = useState<TaskCategory>(initialCategory);
    const initialPriority = initialData?.priority && taskPriorities.includes(initialData.priority) ? initialData.priority : 'medium';
    const [priority, setPriority] = useState<TaskPriority>(initialPriority);
    const [dueDate, setDueDate] = useState<Date | undefined>(initialData?.dueDate);
    const [details, setDetails] = useState(initialData?.details || '');
    const [scheduledTime, setScheduledTime] = useState(initialData?.scheduledTime || ''); 

    // Category-specific fields
    const [metricId, setMetricId] = useState(initialData && isTrackingTask(initialData) ? initialData.metricId || '' : '');
    const [frequency, setFrequency] = useState(initialData && isTrackingTask(initialData) ? initialData.frequency || '' : '');
    const [normalRange, setNormalRange] = useState(initialData && isTrackingTask(initialData) ? initialData.normalRange || '' : '');
    const [description, setDescription] = useState(initialData && isGoalOrRecommendationTask(initialData) ? initialData.description || '' : '');
    const [actionText, setActionText] = useState(initialData && isGoalOrRecommendationTask(initialData) ? initialData.actionText || '' : '');

    // Reset specific fields when category changes
    useEffect(() => {
        if (!isTrackingTask({ category })) {
            setMetricId('');
            setFrequency('');
            setNormalRange('');
        }
        if (!isGoalOrRecommendationTask({ category })) {
            setDescription('');
            setActionText('');
        }
        // Optionally reset details/scheduledTime based on category if desired
        // if (category !== 'medication' && category !== 'appointment') { setScheduledTime(''); }
    }, [category]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return; 

        // Base data common to all tasks
        const baseTaskData = {
            title,
            category,
            priority,
            dueDate: dueDate || undefined, 
            details: details || undefined,
            scheduledTime: scheduledTime || undefined,
            // Add other common optional fields like notes if needed
        };

        let taskData: Omit<DashboardTask, 'id' | 'isCompleted'>;

        // Construct specific task type based on category
        if (category === 'measurement') {
            taskData = {
                ...baseTaskData,
                category: 'measurement', // Explicitly set category
                metricId: metricId || 'unknown_metric', // Provide default/validation
                frequency: frequency || 'unknown_frequency', // Provide default/validation
                normalRange: normalRange || undefined,
            } as Omit<TrackingTask, 'id' | 'isCompleted'>;
        } else if (isGoalOrRecommendationTask({ category })) {
            taskData = {
                ...baseTaskData,
                category: category, // Category is already correct type here
                description: description || 'No description', // Provide default/validation
                actionText: actionText || 'No action', // Provide default/validation
            } as Omit<GoalOrRecommendationTask, 'id' | 'isCompleted'>;
        } else {
             // Assume FutureTask or similar structure for others (medication, appointment, etc.)
            taskData = {
                ...baseTaskData, 
                category: category, // Use the selected category
            } as Omit<FutureTask, 'id' | 'isCompleted'>; // Use FutureTask as a general bucket for now
        }
        
        onSubmit(taskData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div className="space-y-1">
                <Label htmlFor="task-title">عنوان</Label>
                <Input 
                    id="task-title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="مثال: اندازه‌گیری قند خون"
                    required 
                />
            </div>

            {/* Category */}
            <div className="space-y-1">
                <Label htmlFor="task-category">دسته بندی</Label>
                <Select value={category} onValueChange={(value: TaskCategory) => setCategory(value)}>
                    <SelectTrigger id="task-category">
                        <SelectValue placeholder="انتخاب دسته بندی" />
                    </SelectTrigger>
                    <SelectContent>
                        {taskCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>
                                { 
                                    cat === 'measurement' ? 'اندازه‌گیری' :
                                    cat === 'medication' ? 'دارو' :
                                    cat === 'activity' ? 'فعالیت' :
                                    cat === 'nutrition' ? 'تغذیه' :
                                    cat === 'lifestyle' ? 'سبک زندگی' :
                                    cat === 'goal' ? 'هدف' :
                                    cat === 'mental' ? 'روحی/روانی' :
                                    cat === 'appointment' ? 'قرار ملاقات' :
                                    cat === 'other' ? 'سایر' : cat
                                }
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
             {/* Priority */}
             <div className="space-y-1">
                <Label htmlFor="task-priority">اولویت</Label>
                <Select value={priority} onValueChange={(value: TaskPriority) => setPriority(value)}>
                    <SelectTrigger id="task-priority">
                        <SelectValue placeholder="انتخاب اولویت" />
                    </SelectTrigger>
                    <SelectContent>
                        {taskPriorities.map(prio => (
                            <SelectItem key={prio} value={prio}>
                                { prio === 'high' ? 'بالا' : prio === 'medium' ? 'متوسط' : prio === 'low' ? 'پایین' : 'اختیاری' }
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* --- Measurement Fields --- */}
            {category === 'measurement' && (
                <>
                    <div className="space-y-1">
                        <Label htmlFor="task-metricId">متریک مربوطه</Label>
                         {/* Use Select for metricId */}
                         <Select 
                             value={metricId} 
                             onValueChange={(value: string) => setMetricId(value)}
                             required
                         >
                             <SelectTrigger id="task-metricId">
                                 <SelectValue placeholder="انتخاب متریک" />
                             </SelectTrigger>
                             <SelectContent>
                                 {availableMetrics.length > 0 ? (
                                     availableMetrics.map(metric => (
                                         <SelectItem key={metric.id} value={metric.id}>
                                             {metric.name} ({metric.id})
                                         </SelectItem>
                                     ))
                                 ) : (
                                     <SelectItem value="" disabled>متریکی یافت نشد</SelectItem>
                                 )}
                             </SelectContent>
                         </Select>
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="task-frequency">تکرار</Label>
                        <Input 
                            id="task-frequency"
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            placeholder="مثال: روزانه، هفتگی"
                            required
                        />
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="task-normalRange">محدوده نرمال (اختیاری)</Label>
                        <Input 
                            id="task-normalRange"
                            value={normalRange}
                            onChange={(e) => setNormalRange(e.target.value)}
                            placeholder="مثال: 70-100 mg/dL"
                        />
                    </div>
                </>
            )}

            {/* --- Goal/Recommendation Fields --- */}
            {isGoalOrRecommendationTask({ category }) && (
                 <>
                    <div className="space-y-1">
                        <Label htmlFor="task-description">توضیحات</Label>
                        <Textarea 
                            id="task-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="توضیح هدف یا توصیه..."
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="task-actionText">متن دکمه اقدام</Label>
                        <Input 
                            id="task-actionText"
                            value={actionText}
                            onChange={(e) => setActionText(e.target.value)}
                            placeholder="مثال: شروع پیاده‌روی, مشاهده برنامه"
                            required
                        />
                    </div>
                 </>
            )}

            {/* Due Date */}
            <div className="space-y-1">
                <Label htmlFor="task-due-date">تاریخ انجام</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-right font-normal",
                                !dueDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="ml-2 h-4 w-4" />
                            {dueDate ? format(dueDate, "PPP", { locale: typeof window !== 'undefined' ? require('date-fns/locale/fa-IR') : undefined }) : <span>انتخاب تاریخ</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={dueDate}
                            onSelect={setDueDate}
                            initialFocus
                            dir="rtl"
                            locale={typeof window !== 'undefined' ? require('date-fns/locale/fa-IR') : undefined}
                         />
                    </PopoverContent>
                </Popover>
            </div>
            
            {/* Scheduled Time (Consider making visibility conditional based on category too) */}
            <div className="space-y-1">
                <Label htmlFor="task-scheduled-time">زمان مشخص (اختیاری)</Label>
                <Input 
                    id="task-scheduled-time" 
                    value={scheduledTime} 
                    onChange={(e) => setScheduledTime(e.target.value)} 
                    placeholder="مثال: بعد از صبحانه، ۸ شب، ۱۰:۳۰"
                />
            </div>

            {/* Details (General purpose details/notes) */}
            <div className="space-y-1">
                <Label htmlFor="task-details">جزئیات (اختیاری)</Label>
                <Textarea 
                    id="task-details" 
                    value={details} 
                    onChange={(e) => setDetails(e.target.value)} 
                    placeholder="جزئیات بیشتر در مورد این وظیفه..."
                />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                    لغو
                </Button>
                <Button type="submit" className="bg-[#c19a48] hover:bg-[#a17c34]">
                    {initialData ? 'ذخیره تغییرات' : 'افزودن وظیفه'}
                </Button>
            </div>
        </form>
    );
} 