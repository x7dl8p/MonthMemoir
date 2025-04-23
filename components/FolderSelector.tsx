'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useImageStore } from '@/lib/store';
import { ImageFile } from '@/types/image';
import { motion } from 'framer-motion';
import { FolderOpen, Image } from 'lucide-react';

interface FolderSelectorProps {
  onImagesLoaded: () => void;
}

export function FolderSelector({ onImagesLoaded }: FolderSelectorProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [processed, setProcessed] = useState(0);
  const { addImages, loadPreferences } = useImageStore();

  const handleSelectFolder = async () => {
    try {
      // Check if running in an iframe
      if (window !== window.top) {
        toast({
          title: "Browser Restriction",
          description: "File picker can't be used in iframes. Please use this feature on the main application window.",
          variant: "destructive",
        });
        return;
      }

      // Check if File System Access API is supported
      if (!('showDirectoryPicker' in window)) {
        toast({
          title: "Browser Not Supported",
          description: "Your browser doesn't support the File System Access API. Please try a modern browser like Chrome or Edge.",
          variant: "destructive",
        });
        return;
      }

      // Select directory
      const dirHandle = await window.showDirectoryPicker({
        mode: 'read',
      });

      setLoading(true);
      loadPreferences();

      // Process files in directory
      const imageFiles: ImageFile[] = [];
      let totalFiles = 0;
      let processedFiles = 0;

      // Count files first to track progress
      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file') {
          const file = await entry.getFile();
          if (file.type.startsWith('image/')) {
            totalFiles++;
          }
        }
      }

      setTotal(totalFiles);

      // Process each file
      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file') {
          const file = await entry.getFile();

          if (file.type.startsWith('image/')) {
            // Create URL for the image
            const url = URL.createObjectURL(file);
            
            // Get date information (using modified date as fallback)
            const date = await extractImageDate(file);
            
            // Create image object
            const imageFile: ImageFile = {
              id: Math.random().toString(36).substring(2, 11),
              name: file.name,
              path: file.webkitRelativePath || file.name,
              size: file.size,
              type: file.type,
              date: date,
              url: url,
            };

            imageFiles.push(imageFile);
            
            processedFiles++;
            setProcessed(processedFiles);
            setProgress(Math.round((processedFiles / totalFiles) * 100));
          }
        }
      }

      if (imageFiles.length > 0) {
        addImages(imageFiles);
        onImagesLoaded();
        toast({
          title: "Images Loaded",
          description: `Successfully loaded ${imageFiles.length} images.`,
        });
      } else {
        toast({
          title: "No Images Found",
          description: "No image files were found in the selected folder.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error selecting folder:', error);
        toast({
          title: "Error",
          description: error.message || "There was an error loading your images.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const extractImageDate = async (file: File): Promise<Date> => {
    try {
      // Try to extract EXIF data
      const arrayBuffer = await file.arrayBuffer();
      const exifReader = await import('exif-reader');
      const exifData = exifReader.default(arrayBuffer);
      
      if (exifData?.exif?.DateTimeOriginal) {
        const dateStr = exifData.exif.DateTimeOriginal;
        const [datePart, timePart] = dateStr.split(' ');
        const [year, month, day] = datePart.split(':').map(Number);
        const [hour, minute, second] = timePart.split(':').map(Number);
        return new Date(year, month - 1, day, hour, minute, second);
      }
    } catch (error) {
      // EXIF extraction failed, fallback to modified date
      console.log('EXIF extraction failed, using fallback date');
    }
    
    // Fallback to modified date
    return new Date(file.lastModified);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Select a folder</CardTitle>
        <CardDescription>
          Choose a folder containing your images to create a photo calendar
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground text-center">
              Processing {processed} of {total} images...
            </p>
          </div>
        ) : (
          <motion.div 
            className="flex flex-col items-center justify-center py-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Image className="h-10 w-10 text-primary" />
            </div>
            <p className="text-center text-muted-foreground">
              Select a folder containing images to begin
            </p>
          </motion.div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={handleSelectFolder}
          disabled={loading}
        >
          <FolderOpen className="mr-2 h-4 w-4" />
          {loading ? 'Loading...' : 'Select Folder'}
        </Button>
      </CardFooter>
    </Card>
  );
}