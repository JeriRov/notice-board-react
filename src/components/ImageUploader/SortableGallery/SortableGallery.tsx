import React from 'react';

import { SortableContainer } from 'react-sortable-hoc';

import { SortablePhoto } from '../SortablePhoto/SotrtablePhoto';
import { Photo } from '../imageUploader.types';

import { SortableGalleryParams } from './sortableGallery.types';

export const SortableGallery = SortableContainer<SortableGalleryParams>(
  ({ items, onDelete: handleDelete }: SortableGalleryParams) => {
    return (
      <div className="grid grid-cols-4 gap-x-6 items-center">
        {items.map((photo: Photo, index: number) => (
          <SortablePhoto
            index={index}
            key={index}
            onDelete={handleDelete}
            photo={photo}
            photoIndex={index}
          />
        ))}
      </div>
    );
  },
);
