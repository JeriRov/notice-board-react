import { FC } from 'react';

import { WhiteCard } from '../../../containers/WhiteCard/WhiteCard';

import { NoticeItemProps } from './notice.types';

export const NoticeItem: FC<NoticeItemProps> = ({
  notice,
  onClick: handleClick,
}) => {
  return (
    <button
      className={'w-full h-full text-start'}
      onClick={() => handleClick(notice._id)}>
      <WhiteCard
        className={
          'my-2 flex flex-row justify-between hover:bg-swipesell-slate-100'
        }>
        <img
          alt={'image'}
          className={'rounded w-[200px] h-auto'}
          src={notice?.photos ? notice.photos[0] : ''}
        />
        <div className={'flex p-4 flex-col w-full justify-between items-start'}>
          <h1 className={'text-2xl'}>{notice.title}</h1>
          <span className={'text-swipesell-slate-400'}>
            {notice.city} -{' '}
            {new Date(parseInt(notice.dateAdded)).toDateString()}
          </span>
        </div>
        <div className={'flex p-4 flex-col w-full justify-between items-end'}>
          <h1 className={'text-2xl font-bold'}>{notice.item.price} грн.</h1>
        </div>
      </WhiteCard>
    </button>
  );
};
