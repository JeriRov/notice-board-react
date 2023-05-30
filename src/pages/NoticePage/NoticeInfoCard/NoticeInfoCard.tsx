import React, { FC } from 'react';

import { WhiteCard } from '../../../containers/WhiteCard/WhiteCard';
import { NoticeParams } from '../../../store/notices/notices.types';

export interface NoticeInfoCardProps {
  notice?: NoticeParams;
}
export const NoticeInfoCard: FC<NoticeInfoCardProps> = ({ notice }) => {
  return (
    <div className={'flex'}>
      <WhiteCard className={'flex mx-10 w-2/3'}>
        <div className="w-full m-auto relative group">
          <div>
            <div className={'flex gap-2'}>
              {notice?.dateAdded
                ? `${new Date(
                    parseInt(notice?.dateAdded),
                  ).toLocaleDateString()}`
                : null}
            </div>
            <div className={'p-5'}>
              <div className={'capitalize text-4xl mb-4'}>{notice?.title}</div>
              <div className={'font-bold text-3xl mb-4'}>
                {notice?.item?.price} грн.
              </div>
              <div className={'font-bold text-4xl mt-6 mb-4'}>Опис</div>
              <div className={'flex capitalize mb-4'}>
                {notice?.description}
              </div>
              <div className={'border-b-2 border-swipesell-slate-400'} />
            </div>
          </div>
        </div>
      </WhiteCard>
      <WhiteCard className={'flex w-1/2 flex-col'}>
        <div className={'font-bold text-2xl mb-4'}>
          {notice?.item.category.name}
        </div>
        <div className={'flex flex-col gap-1'}>
          {notice?.item.category.characteristics.map(characteristic => {
            return (
              <div className={'flex'} key={characteristic.name}>
                <div className={'font-bold text-xl mr-2'}>
                  {characteristic.name}:
                </div>
                <div className={'text-xl'}>{characteristic.value}</div>
              </div>
            );
          })}
        </div>
      </WhiteCard>
    </div>
  );
};
