import React, { FC, useState } from 'react';

import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

import { NOTICE_BANNER_CARD_ICON_SIZE } from './noticeBannerCard.settings';
import { NoticeBannerCardProps } from './noticeBannerCard.types';

export const NoticeBannerCard: FC<NoticeBannerCardProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNextSlide = () => {
    const isLastSlide = currentIndex === photos.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[700px] h-[700px] w-full m-auto py-12 px-4 relative group">
      <div
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        style={{ backgroundImage: `url(${photos[currentIndex]})` }}
      />
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft
          onClick={handlePrevSlide}
          size={NOTICE_BANNER_CARD_ICON_SIZE}
        />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight
          onClick={handleNextSlide}
          size={NOTICE_BANNER_CARD_ICON_SIZE}
        />
      </div>
      <div className="flex top-4 justify-center py-2">
        {photos.map((slide, slideIndex) => (
          <div
            className="text-2xl cursor-pointer"
            key={slideIndex}
            onClick={() => handleToSlide(slideIndex)}>
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};
