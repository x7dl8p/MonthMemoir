'use client';

import { useState } from 'react';
import { Calendar } from '@/components/calendar/Calendar';
import { FolderSelector } from '@/components/FolderSelector';
import { MonthList } from '@/components/gallery/MonthList';
import { useImageStore } from '@/lib/store';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);
  const { images } = useImageStore();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {!showGallery || images.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center mt-20 px-4"
          >
            <FolderSelector onImagesLoaded={() => setShowGallery(true)} />
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex h-[calc(100vh-64px)]"
            >
              <Sidebar>
                <MonthList />
              </Sidebar>
              <div className="flex-1 grid grid-cols-2 divide-x">
                <div className="p-4 lg:p-8 overflow-auto">
                  <Calendar />
                </div>
                <div className="p-4 lg:p-8 bg-accent/5">
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Hover over a day with images to preview
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}