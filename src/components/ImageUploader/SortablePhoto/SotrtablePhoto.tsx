import React from 'react';

import { FiTrash } from 'react-icons/fi';
import { SortableElement } from 'react-sortable-hoc';

import { SORTABLE_PHOTO_IMAGE_ALT } from './sotrtablePhoto.settings';
import { SortablePhotoParams } from './sotrtablePhoto.types';

export const SortablePhoto = SortableElement<SortablePhotoParams>(
  ({ photo, onDelete: handleDelete, photoIndex }: SortablePhotoParams) => {
    return (
      <div className="w-48 col-span-1">
        <div className="relative group">
          {photoIndex === 0 && (
            <div className="absolute bottom-0 right-0 bg-swipesell-slate-900 text-white opacity-80 p-1 rounded-md">
              <span>Це фото головне!</span>
            </div>
          )}
          <img
            alt={SORTABLE_PHOTO_IMAGE_ALT}
            className="w-[185px] h-[150px] rounded-md object-cover m-2"
            src={photo.src}
          />
          <button
            className={
              'bg-red-500 z-10 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 transition-opacity opacity-0 group-hover:opacity-100'
            }
            onClick={() => handleDelete(photo)}>
            <span className={'pointer-events-none'}>
              <FiTrash className={'z-0'} onClick={() => handleDelete(photo)} />
            </span>
          </button>
        </div>
      </div>
    );
  },
);
