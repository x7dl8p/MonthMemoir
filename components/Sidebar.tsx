'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
            onClick={() => setIsCollapsed(true)}
          />
        )}
      </AnimatePresence>
      
      <motion.div
        initial={false}
        animate={{ 
          width: isCollapsed ? '48px' : '320px',
          boxShadow: isCollapsed ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 30 
        }}
        className={cn(
          "relative border-r bg-card min-h-[calc(100vh-64px)] z-40",
          !isCollapsed && "bg-card/95 backdrop-blur-sm"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute -right-4 top-2 z-10 transition-transform duration-200",
            !isCollapsed && "hover:scale-110"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
        
        <motion.div
          initial={false}
          animate={{ 
            opacity: isCollapsed ? 0 : 1,
            scale: isCollapsed ? 0.9 : 1
          }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
}