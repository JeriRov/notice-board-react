import { Photo } from '../imageUploader.types';

export interface SortableGalleryParams {
  items: Photo[];
  onDelete: (photo: Photo) => void;
}
