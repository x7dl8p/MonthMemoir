'use client';

import { ModeToggle } from '@/components/ModeToggle';
import { Calendar } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 backdrop-blur-md bg-background/50 z-50 border-b">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Photo Calendar</h1>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}