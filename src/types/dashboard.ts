// Types for Health Metrics displayed on the dashboard

/** Represents a single data point in a health metric's history. */
export interface MetricHistoryPoint {
  date: Date;
  value: number | { systolic: number; diastolic: number }; // Can be single number or BP object
}

/** Defines the structure for a health metric. */
export interface HealthMetric {
  id: string; // e.g., 'weight', 'bloodSugar', 'bloodPressure'
  name: string; // e.g., 'وزن', 'قند خون'
  unit: string; // e.g., 'کیلوگرم', 'mg/dL', 'mmHg'
  currentValue: number | { systolic: number; diastolic: number };
  targetValue?: number | { min: number; max: number } | { systolic: { min: number; max: number }; diastolic: { min: number; max: number } };
  history: MetricHistoryPoint[];
  trend?: 'increasing' | 'decreasing' | 'stable'; // Optional trend analysis
  status?: 'good' | 'warning' | 'danger' | 'normal'; // Optional assessment status
  lastUpdated: Date;
}

// Types for Tasks (Things to do)

// Exported literal types for category and priority
export type TaskCategory = 'medication' | 'activity' | 'nutrition' | 'appointment' | 'measurement' | 'lifestyle' | 'goal' | 'mental' | 'other';
export type TaskPriority = 'high' | 'medium' | 'low' | 'optional';

/** Base properties for any task on the dashboard. */
interface BaseTask {
  id: string;
  title: string;
  category: TaskCategory; // Use exported type
  priority: TaskPriority; // Use exported type
  isCompleted: boolean;
  dueDate?: Date; // Optional due date
  notes?: string; // Optional additional notes (general)
  scheduledTime?: string; // Make optional on base task
  details?: string;      // Make optional on base task
}

/** Represents tasks that require tracking/measurement (e.g., measure blood sugar). */
export interface TrackingTask extends BaseTask {
  category: 'measurement';
  metricId: string; // Links to the relevant HealthMetric (e.g., 'bloodSugar')
  lastMeasuredValue?: number | { systolic: number; diastolic: number };
  lastMeasuredDate?: Date;
  frequency: string; // e.g., 'روزانه', 'هفتگی', 'صبح و شب'
  normalRange?: string; // e.g., '70-100 mg/dL'
  // details?: string; // Removed from here, now in BaseTask
}

/** Represents future scheduled tasks (e.g., appointments, reminders). */
export interface FutureTask extends BaseTask {
  category: 'appointment' | 'medication' | 'activity' | 'lifestyle' | 'other';
  // scheduledTime?: string; // Removed from here, now in BaseTask
  // details?: string; // Removed from here, now in BaseTask
}

/** Represents actionable recommendations or goals. */
export interface GoalOrRecommendationTask extends BaseTask {
  category: 'nutrition' | 'activity' | 'lifestyle' | 'goal' | 'mental';
  description: string;
  actionText: string; // e.g., 'شروع پیاده‌روی', 'بیشتر بدانید'
  link?: string; // Optional link for more info
  // details?: string; // Can inherit from BaseTask if needed for recommendations too
}

// Union type for all possible dashboard tasks
export type DashboardTask = TrackingTask | FutureTask | GoalOrRecommendationTask;

/** Represents an achievement or milestone. */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Placeholder for icon name or component identifier
  isAchieved: boolean;
  achievedDate?: Date;
  category: 'streak' | 'goal' | 'consistency' | 'milestone' | 'other';
}

// Type for the overall dashboard state or data structure
export interface DashboardData {
  user: {
    name: string;
    avatarUrl?: string;
  };
  currentDate: Date;
  allMetrics: HealthMetric[]; // All available metrics for the user
  selectedMetricIds: string[]; // IDs of metrics selected for display/tracking
  tasks: DashboardTask[];
  achievements: Achievement[]; // Add achievements list
  // Potentially add progress summary, achievements etc. later
} 