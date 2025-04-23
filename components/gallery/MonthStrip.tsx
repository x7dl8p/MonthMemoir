'use client';

import { useState } from 'react';
import { ImageFile } from '@/types/image';
import { ImageThumbnail } from './ImageThumbnail';
import { motion } from 'framer-motion';

interface MonthStripProps {
  images: ImageFile[];
  month: Date;
}

export function MonthStrip({ images, month }: MonthStripProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Take maximum 6 images for the strip
  const displayImages = images.slice(0, 6);
  
  return (
    <motion.div
      className="rounded-md overflow-hidden relative h-16 bg-accent/30"
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-full">
        {displayImages.map((image, index) => (
          <motion.div 
            key={image.id}
            className="h-full flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ImageThumbnail image={image} small />
          </motion.div>
        ))}
        
        {displayImages.length < 6 && Array.from({ length: 6 - displayImages.length }).map((_, i) => (
          <div key={`empty-${i}`} className="h-full flex-1 bg-accent/30"></div>
        ))}
      </div>
      
      {!isHovered && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-full h-1 bg-primary/20 relative">
            <motion.div 
              className="absolute top-0 left-0 h-1 bg-primary"
              style={{ width: `${Math.min(100, images.length / 10 * 100)}%` }}
            />
          </div>
        </motion.div>
      )}
      
      {images.length > 6 && isHovered && (
        <div className="absolute bottom-1 right-1 text-xs bg-primary/80 text-primary-foreground rounded-full px-1.5 py-0.5">
          +{images.length - 6}
        </div>
      )}
    </motion.div>
  );
}