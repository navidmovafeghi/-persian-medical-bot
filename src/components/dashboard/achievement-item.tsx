import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Trophy, Activity, Target, Repeat } from "lucide-react"; // Example icons
import { Achievement } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface AchievementItemProps {
  achievement: Achievement;
  className?: string;
}

// Helper to get icon based on category or specific ID
const getAchievementIcon = (achievement: Achievement) => {
  // Placeholder: map achievement.icon string or category to actual icon component
  switch (achievement.category) {
    case 'streak': return <Repeat className="h-5 w-5 text-blue-500" />;
    case 'goal': return <Target className="h-5 w-5 text-green-500" />;
    case 'consistency': return <Activity className="h-5 w-5 text-purple-500" />;
    case 'milestone': return <Trophy className="h-5 w-5 text-amber-500" />;
    default: return <Trophy className="h-5 w-5 text-slate-500" />;
  }
};

export const AchievementItem: React.FC<AchievementItemProps> = ({ achievement, className }) => {
  return (
    <div className={cn(
      "flex items-start gap-4 p-3 border-b border-slate-100 last:border-b-0", 
      achievement.isAchieved ? "opacity-100" : "opacity-50",
      className
    )}>
      <div className={cn(
          "p-2 rounded-full",
          achievement.isAchieved ? "bg-green-100" : "bg-slate-100"
      )}>
        {getAchievementIcon(achievement)}
      </div>
      <div className="flex-1">
        <h4 className={cn(
          "font-medium", 
          achievement.isAchieved ? "text-slate-800" : "text-slate-500"
        )}>
          {achievement.title}
        </h4>
        <p className={cn(
          "text-sm mt-0.5",
           achievement.isAchieved ? "text-slate-600" : "text-slate-400"
        )}>
          {achievement.description}
        </p>
        {achievement.isAchieved && achievement.achievedDate && (
          <p className="text-xs text-green-600 mt-1">
            کسب شده در: {achievement.achievedDate.toLocaleDateString('fa-IR')}
          </p>
        )}
      </div>
    </div>
  );
}; 