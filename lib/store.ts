'use client';

import { create } from 'zustand';
import { ImageFile, MonthImages, DateImages, DeleteConfirmState } from '@/types/image';
import { getMonthKey, getDayKey } from './utils';

interface ImageState {
  images: ImageFile[];
  dateImages: DateImages;
  monthImages: MonthImages;
  deleteConfirm: DeleteConfirmState;
  dontShowDeleteConfirm: boolean;
  addImages: (images: ImageFile[]) => void;
  deleteImage: (id: string) => void;
  confirmDelete: (id: string) => void;
  cancelDelete: () => void;
  setDontShowDeleteConfirm: (value: boolean) => void;
  loadPreferences: () => void;
}

export const useImageStore = create<ImageState>()((set, get) => ({
  images: [],
  dateImages: {},
  monthImages: {},
  deleteConfirm: {
    isOpen: false,
    imageId: null,
    dontShowAgain: false,
  },
  dontShowDeleteConfirm: false,

  loadPreferences: () => {
    try {
      const preference = localStorage.getItem('dontShowDeleteConfirm');
      if (preference) {
        set({ dontShowDeleteConfirm: JSON.parse(preference) });
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  },

  addImages: (newImages) => {
    set((state) => {
      const allImages = [...state.images, ...newImages];
      
      // Organize by date
      const dateImages: DateImages = {};
      const monthImages: MonthImages = {};

      allImages.forEach(image => {
        const dayKey = getDayKey(image.date);
        const monthKey = getMonthKey(image.date);

        // Add to date images
        if (!dateImages[dayKey]) {
          dateImages[dayKey] = [];
        }
        dateImages[dayKey].push(image);

        // Add to month images
        if (!monthImages[monthKey]) {
          monthImages[monthKey] = [];
        }
        monthImages[monthKey].push(image);
      });

      return { images: allImages, dateImages, monthImages };
    });
  },

  deleteImage: (id) => {
    set((state) => {
      const images = state.images.filter(img => img.id !== id);
      
      // Rebuild date and month organization
      const dateImages: DateImages = {};
      const monthImages: MonthImages = {};

      images.forEach(image => {
        const dayKey = getDayKey(image.date);
        const monthKey = getMonthKey(image.date);

        // Add to date images
        if (!dateImages[dayKey]) {
          dateImages[dayKey] = [];
        }
        dateImages[dayKey].push(image);

        // Add to month images
        if (!monthImages[monthKey]) {
          monthImages[monthKey] = [];
        }
        monthImages[monthKey].push(image);
      });

      return { images, dateImages, monthImages };
    });
  },

  confirmDelete: (id) => {
    set({ deleteConfirm: { isOpen: true, imageId: id, dontShowAgain: false } });
  },

  cancelDelete: () => {
    set({ deleteConfirm: { isOpen: false, imageId: null, dontShowAgain: false } });
  },

  setDontShowDeleteConfirm: (value) => {
    localStorage.setItem('dontShowDeleteConfirm', JSON.stringify(value));
    set({ dontShowDeleteConfirm: value });
  },
}));