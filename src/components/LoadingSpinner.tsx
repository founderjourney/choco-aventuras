import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600',
        className
      )}
    />
  );
}
