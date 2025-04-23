'use client';

import { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, getDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useImageStore } from '@/lib/store';
import { CalendarDay } from './CalendarDay';
import { DeleteConfirmDialog } from '../gallery/DeleteConfirmDialog';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImagePreview } from './ImagePreview';
import { ImageFile } from '@/types/image';

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const { dateImages, deleteConfirm } = useImageStore();

  // Calculate days for current month view
  const getDaysInMonth = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Get the day of the week for the first day of the month (0 = Sunday, 6 = Saturday)
    const startDay = getDay(monthStart);
    
    // Add empty days at the beginning to align with correct day of week
    const emptyCells = Array(startDay).fill(null);
    
    return [...emptyCells, ...daysInMonth];
  };

  // Month navigation
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const handleDaySelect = (images: ImageFile[]) => {
    setSelectedImages(images);
  };

  return (
    <div className="bg-card shadow-sm rounded-lg p-4">
      <DeleteConfirmDialog />
      
      <div className="flex items-center justify-between mb-6">
        <motion.h2 
          className="text-2xl font-bold"
          key={format(currentMonth, 'yyyy-MM')}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {format(currentMonth, 'MMMM yyyy')}
        </motion.h2>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium py-2">
            {day}
          </div>
        ))}
      </div>
      
      <motion.div 
        className="grid grid-cols-7 gap-1"
        key={format(currentMonth, 'yyyy-MM')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {getDaysInMonth().map((day, index) => (
          <CalendarDay 
            key={day ? format(day, 'yyyy-MM-dd') : `empty-${index}`}
            date={day}
            isCurrentMonth={day ? isSameMonth(day, currentMonth) : false}
            images={day ? dateImages[format(day, 'yyyy-MM-dd')] || [] : []}
            onSelect={handleDaySelect}
          />
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {selectedImages.length > 0 && (
          <ImagePreview 
            images={selectedImages}
            onClose={() => setSelectedImages([])}
          />
        )}
      </AnimatePresence>
    </div>
  );
}