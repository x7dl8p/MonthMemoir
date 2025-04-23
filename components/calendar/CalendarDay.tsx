'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ImageFile } from '@/types/image';
import { useImageStore } from '@/lib/store';

interface CalendarDayProps {
  date: Date | null;
  isCurrentMonth: boolean;
  images: ImageFile[];
  onSelect: (images: ImageFile[]) => void;
}

export function CalendarDay({ date, isCurrentMonth, images, onSelect }: CalendarDayProps) {
  const hasImages = images && images.length > 0;
  
  if (!date) {
    return <div className="aspect-square p-1 bg-accent/30" />;
  }

  const dayNumber = format(date, 'd');
  
  return (
    <div
      className={cn(
        "aspect-square relative overflow-hidden rounded-md transition-all duration-200",
        isCurrentMonth ? "bg-card hover:bg-accent/20" : "bg-accent/30",
        hasImages && "cursor-pointer hover:shadow-md hover:scale-[1.02]"
      )}
      onClick={() => hasImages && onSelect(images)}
    >
      <div 
        className={cn(
          "absolute top-1 left-1 w-6 h-6 flex items-center justify-center text-sm rounded-full",
          isCurrentMonth ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {dayNumber}
      </div>
      
      {hasImages && (
        <div className="absolute top-1 right-1 flex items-center">
          <span className="text-xs bg-primary/10 text-primary rounded-full px-1.5 py-0.5">
            {images.length}
          </span>
        </div>
      )}
    </div>
  );
}