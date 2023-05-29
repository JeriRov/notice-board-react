import React, { FC, useState } from 'react';

import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { v4 as uuid4 } from 'uuid';

import { COLORS } from '../../constants/colors';

import { SortableGallery } from './SortableGallery/SortableGallery';

import {
  IMAGE_LIMIT_ERROR,
  MAX_COUNT,
  UPLOAD_IMAGE_INPUT_ACCEPT,
  UPLOAD_IMAGE_INPUT,
  UPLOAD_IMAGE_INPUT_MULTIPLE,
  UPLOAD_IMAGE_INPUT_NAME,
  UPLOAD_IMAGE_INPUT_TYPE,
  SORTABLE_GALLERY_AXIS,
  UPLOAD_IMAGE_INPUT_ICON_SIZE,
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
} from './imageUploader.settings';
import { Images, Photo } from './imageUploader.types';

export const ImageUploader: FC<Images> = ({ onPhoto }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [fileLimit, setFileLimit] = useState(false);

  const handleDelete = (photo: Photo) => {
    setFileLimit(false);
    setPhotos(prevPhotos => prevPhotos.filter(p => p.id !== photo.id));
  };

  const handleSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setPhotos(prevPhotos => {
      const newPhotos = [...prevPhotos];
      newPhotos.splice(newIndex, 0, newPhotos.splice(oldIndex, 1)[0]);
      return newPhotos;
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      if (photos.length + files.length > MAX_COUNT) {
        toast.error(IMAGE_LIMIT_ERROR);
        return;
      }
      onPhoto(files);
      const newPhotos: Photo[] = Array.from(files).map((file, index) => ({
        id: uuid4() + index,
        src: URL.createObjectURL(file),
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
      }));
      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    }
  };

  return (
    <div className={'flex flex-row'}>
      <div className="flex items-center justify-center w-1/4 mr-5">
        <label
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          htmlFor={UPLOAD_IMAGE_INPUT}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FiUpload
              className={'mb-2'}
              color={COLORS.slate['100']}
              size={UPLOAD_IMAGE_INPUT_ICON_SIZE}
            />
            <span className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              JPEG, PNG or JPG
            </span>
          </div>
          <input
            accept={UPLOAD_IMAGE_INPUT_ACCEPT}
            className="hidden"
            disabled={fileLimit}
            id={UPLOAD_IMAGE_INPUT}
            multiple={UPLOAD_IMAGE_INPUT_MULTIPLE}
            name={UPLOAD_IMAGE_INPUT_NAME}
            onChange={handleInputChange}
            type={UPLOAD_IMAGE_INPUT_TYPE}
          />
        </label>
      </div>
      <SortableGallery
        axis={SORTABLE_GALLERY_AXIS}
        items={photos}
        onDelete={handleDelete}
        onSortEnd={handleSortEnd}
      />
    </div>
  );
};
