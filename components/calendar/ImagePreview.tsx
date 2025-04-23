'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImageThumbnail } from '../gallery/ImageThumbnail';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ImageFile } from '@/types/image';
import { useImageStore } from '@/lib/store';

interface ImagePreviewProps {
  images: ImageFile[];
  onClose: () => void;
}

export function ImagePreview({ images, onClose }: ImagePreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { confirmDelete, deleteImage, dontShowDeleteConfirm } = useImageStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex(prev => Math.min(images.length - 1, prev + 1));
      } else if (e.key === 'd') {
        if (dontShowDeleteConfirm) {
          deleteImage(images[currentIndex].id);
          if (currentIndex >= images.length - 1) {
            setCurrentIndex(Math.max(0, images.length - 2));
          }
        } else {
          confirmDelete(images[currentIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images, onClose, confirmDelete, deleteImage, dontShowDeleteConfirm]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-16 right-0 bottom-0 w-1/2 bg-background/95 backdrop-blur-sm border-l z-40"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 z-50"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="relative h-full p-8">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/80 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 to-transparent z-10" />
        
        <div className="relative h-full flex items-center">
          {/* Background stacked images */}
          {images.slice(Math.max(0, currentIndex - 2), currentIndex).reverse().map((image, idx) => (
            <motion.div
              key={image.id}
              initial={false}
              animate={{ 
                opacity: 0.3,
                scale: 0.9 - idx * 0.05,
                x: `-${50 + idx * 5}%`,
                y: `-${idx * 20}px`
              }}
              className="absolute left-1/2 w-[80%] aspect-[4/3] rounded-xl overflow-hidden"
            >
              <ImageThumbnail image={image} />
            </motion.div>
          ))}

          {/* Current image */}
          <motion.div
            key={images[currentIndex].id}
            initial={false}
            animate={{ opacity: 1, scale: 1, x: '-50%' }}
            className="absolute left-1/2 w-[80%] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl"
          >
            <ImageThumbnail image={images[currentIndex]} />
          </motion.div>

          {/* Navigation buttons */}
          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between z-20">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-background/50 backdrop-blur-sm"
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-background/50 backdrop-blur-sm"
              onClick={() => setCurrentIndex(prev => Math.min(images.length - 1, prev + 1))}
              disabled={currentIndex === images.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Image counter and delete hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
            <span className="text-sm bg-background/50 backdrop-blur-sm rounded-full px-3 py-1">
              {currentIndex + 1} / {images.length}
            </span>
            <span className="text-sm bg-destructive/10 text-destructive backdrop-blur-sm rounded-full px-3 py-1">
              Press 'd' to delete
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}