'use client';

import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useImageStore } from '@/lib/store';

export function DeleteConfirmDialog() {
  const { deleteConfirm, deleteImage, cancelDelete, setDontShowDeleteConfirm } = useImageStore();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleDelete = () => {
    if (deleteConfirm.imageId) {
      deleteImage(deleteConfirm.imageId);
      
      if (dontShowAgain) {
        setDontShowDeleteConfirm(true);
      }
    }
    cancelDelete();
  };

  const handleCancel = () => {
    cancelDelete();
  };

  return (
    <AlertDialog open={deleteConfirm.isOpen} onOpenChange={(open) => !open && cancelDelete()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Image</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this image? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center space-x-2 py-2">
          <Checkbox 
            id="dont-show-again" 
            checked={dontShowAgain}
            onCheckedChange={(checked) => setDontShowAgain(checked === true)}
          />
          <Label htmlFor="dont-show-again">Don't show this confirmation again</Label>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}