'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component that catches JavaScript errors in its child component tree.
 * Displays a fallback UI instead of crashing the whole application.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-[300px] p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-error-foreground">
                <AlertTriangle className="h-5 w-5" />
                خطایی رخ داده است
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                متأسفانه خطایی در نمایش این بخش رخ داده است. لطفاً صفحه را بارگذاری مجدد کنید.
              </p>
              {this.state.error && (
                <div className="text-xs text-gray-500 p-2 bg-gray-100 rounded-md overflow-auto">
                  <p>{this.state.error.toString()}</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={this.resetError} className="mr-2">
                <RefreshCw className="h-4 w-4 mr-2" />
                تلاش مجدد
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                بارگذاری مجدد صفحه
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 