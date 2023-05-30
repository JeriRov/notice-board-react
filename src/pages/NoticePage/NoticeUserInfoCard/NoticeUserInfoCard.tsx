import React, { FC } from 'react';

import { FiMapPin, FiMessageSquare, FiPhone } from 'react-icons/fi';

import { CustomButton } from '../../../components/CustomButton/CustomButton';
import { COLORS } from '../../../constants/colors';
import { NOTICE_PAGE_ICON_SIZE } from '../noticePage.settings';

import { NoticeUserInfoCardProps } from './noticeUserInfoCard.types';

export const NoticeUserInfoCard: FC<NoticeUserInfoCardProps> = ({
  user,
  city,
}) => {
  const [isPhone, setIsPhone] = React.useState(false);
  const handleClick = () => {
    setIsPhone(!isPhone);
  };
  return (
    <div className="max-w-[700px] h-[700px] w-full m-auto pt-44 px-4 relative group">
      <div className={'flex items-center gap-2 mb-4'}>
        <img
          alt={'image'}
          className={'w-[50px] h-[50px] rounded-full'}
          src={user?.avatar}
        />
        <div className={'flex flex-col'}>
          <div className={'font-bold'}>
            {user?.firstName} {user?.lastName}
          </div>
          {user?.email ? <div>{user?.email}</div> : null}
        </div>
      </div>
      <div className={'flex gap-3 my-5'}>
        <CustomButton
          className={'w-1/2 font-bold'}
          onClick={handleClick}
          title={isPhone ? user?.phoneNumber : 'Телефон'}>
          <FiPhone size={NOTICE_PAGE_ICON_SIZE} />
        </CustomButton>
        <CustomButton className={'w-1/2 font-bold'} title={'Написати'}>
          <FiMessageSquare size={NOTICE_PAGE_ICON_SIZE} />
        </CustomButton>
      </div>
      <div className={'font-bold flex justify-around'}>
        <div className={'flex gap-2 items-center mx-4'}>
          <FiMapPin color={COLORS.slate['800']} size={NOTICE_PAGE_ICON_SIZE} />
          <div className={'flex-col capitalize'}>
            <p>{city?.objectName ? city.objectName.toLowerCase() : null},</p>
            <p className={'text-swipesell-slate-500'}>
              {city?.community?.toLowerCase()}
            </p>
          </div>
        </div>
        <div>
          <img
            alt={'map'}
            src={'https://www.olx.ua/app/static/media/staticmap.65e20ad98.svg'}
            width={200}
          />
        </div>
      </div>
    </div>
  );
};
