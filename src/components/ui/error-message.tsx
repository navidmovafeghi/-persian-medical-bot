'use client';

import { AlertCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/utils/utils';

export type ErrorSeverity = 'info' | 'warning' | 'error' | 'fatal';

interface ErrorMessageProps {
  message: string | ReactNode;
  severity?: ErrorSeverity;
  className?: string;
  onRetry?: () => void;
}

/**
 * A component for displaying error messages consistently across the application
 */
export function ErrorMessage({
  message,
  severity = 'error',
  className,
  onRetry,
}: ErrorMessageProps) {
  const icons = {
    info: <Info className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
    error: <AlertCircle className="h-4 w-4" />,
    fatal: <XCircle className="h-4 w-4" />,
  };

  const colors = {
    info: 'bg-blue-50 text-blue-700 border-blue-100',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    error: 'bg-red-50 text-red-700 border-red-100',
    fatal: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div
      className={cn(
        'flex items-start border rounded-md p-3 text-sm',
        colors[severity],
        className
      )}
      role="alert"
    >
      <div className="flex-shrink-0 mr-2">{icons[severity]}</div>
      <div className="flex-1">
        {message}
        {onRetry && (
          <button
            onClick={onRetry}
            className="underline mt-1 text-xs hover:text-opacity-80"
          >
            تلاش مجدد
          </button>
        )}
      </div>
    </div>
  );
} 