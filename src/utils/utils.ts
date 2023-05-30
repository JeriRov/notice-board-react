import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

import { storage } from '../fitebase';

export const uploadImagesToFirebase = async (
  images: FileList | null | undefined,
) => {
  let imagesURIs: string[] | undefined = undefined;
  if (images) {
    imagesURIs = [];
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `images/${images[i].name + v4()}`);
      const imageUpload = await uploadBytes(imageRef, images[i]);
      const image = await getDownloadURL(imageUpload.ref);
      imagesURIs.push(image);
    }
  }
  return imagesURIs;
};
