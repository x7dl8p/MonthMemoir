export interface ImageFile {
  id: string;
  name: string;
  path: string;
  size: number;
  type: string;
  date: Date;
  url: string;
  thumbnail?: string;
  width?: number;
  height?: number;
}

export interface MonthData {
  key: string;
  month: Date;
  images: ImageFile[];
}

export interface DateImages {
  [date: string]: ImageFile[];
}

export interface MonthImages {
  [month: string]: ImageFile[];
}

export interface DeleteConfirmState {
  isOpen: boolean;
  imageId: string | null;
  dontShowAgain: boolean;
}

export interface DeletePreferences {
  dontShowConfirmation: boolean;
}