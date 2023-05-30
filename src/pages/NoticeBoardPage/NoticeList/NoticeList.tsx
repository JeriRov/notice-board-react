import React, { FC } from 'react';

import { NoticeItem } from '../Notice/Notice';

import { NoticeBoardProps } from './noticeList.types';

export const NoticeList: FC<NoticeBoardProps> = ({
  list,
  onClick: handleClick,
}) => {
  return (
    <div>
      {list?.map(notice => (
        <NoticeItem key={notice._id} notice={notice} onClick={handleClick} />
      ))}
    </div>
  );
};
