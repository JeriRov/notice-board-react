import { Photo } from '../imageUploader.types';

export interface SortablePhotoParams {
  photo: Photo;
  onDelete: (photo: Photo) => void;
  photoIndex: number;
}
