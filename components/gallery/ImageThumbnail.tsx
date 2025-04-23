'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ImageFile } from '@/types/image';

interface ImageThumbnailProps {
  image: ImageFile;
  small?: boolean;
}

export function ImageThumbnail({ image, small = false }: ImageThumbnailProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isLoaded ? 1 : 0,
        scale: isLoaded ? 1 : 0.9
      }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-md w-full h-full flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
      
      <Image
        src={image.url}
        alt={image.name}
        fill
        className="object-contain"
        onLoad={() => setIsLoaded(true)}
        style={{ opacity: isLoaded ? 1 : 0 }}
        sizes={small ? "100px" : "50vw"}
      />
    </motion.div>
  );
}