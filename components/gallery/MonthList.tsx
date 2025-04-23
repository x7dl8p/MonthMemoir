'use client';

import { useState, useEffect } from 'react';
import { format, parse, compareAsc } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useImageStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { MonthStrip } from './MonthStrip';
import { motion } from 'framer-motion';
import { formatMonthYear } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';

export function MonthList() {
  const { monthImages } = useImageStore();
  const [sortedMonths, setSortedMonths] = useState<string[]>([]);
  
  useEffect(() => {
    // Sort months in descending order (newest first)
    const months = Object.keys(monthImages).sort((a, b) => {
      const dateA = parse(a, 'yyyy-MM', new Date());
      const dateB = parse(b, 'yyyy-MM', new Date());
      return compareAsc(dateB, dateA);
    });
    
    setSortedMonths(months);
  }, [monthImages]);

  const getTotalImageCount = () => {
    return Object.values(monthImages).reduce((total, images) => total + images.length, 0);
  };

  if (sortedMonths.length === 0) {
    return (
      <div className="bg-card shadow-sm rounded-lg p-4 h-full flex items-center justify-center">
        <p className="text-muted-foreground text-center">No images loaded</p>
      </div>
    );
  }

  return (
    <div className="bg-card shadow-sm rounded-lg p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Months</h2>
        <div className="text-sm text-muted-foreground flex items-center">
          <CalendarIcon className="h-4 w-4 mr-1" />
          {getTotalImageCount()} photos
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-230px)]">
        <div className="space-y-6 pr-3">
          {sortedMonths.map((monthKey, index) => {
            const date = parse(monthKey, 'yyyy-MM', new Date());
            const images = monthImages[monthKey];
            
            return (
              <motion.div
                key={monthKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium">{formatMonthYear(date)}</h3>
                  <span className="text-xs text-muted-foreground">
                    {images.length} photos
                  </span>
                </div>
                
                <MonthStrip 
                  images={images} 
                  month={date} 
                />
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}