import React, { FC, useCallback, useEffect, useState } from 'react';

import { FiEdit } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';

import { CustomButton } from '../../components/CustomButton/CustomButton';
import { WhiteCard } from '../../containers/WhiteCard/WhiteCard';
import { useLazyGetNoticeByIdQuery } from '../../services/notices/noticesApi';
import {
  useLazyGetUserByIdQuery,
  useLazyGetUserCityQuery,
} from '../../services/user/userApi';
import { useAuth } from '../../store/auth/useAuth';
import { CitiesParams, NoticeParams } from '../../store/notices/notices.types';
import { UserParams } from '../../store/user/user.types';

import { NoticeBannerCard } from './NoticeBannerCard/NoticeBannerCard';
import { NoticeInfoCard } from './NoticeInfoCard/NoticeInfoCard';
import { NoticeUserInfoCard } from './NoticeUserInfoCard/NoticeUserInfoCard';

import {
  NOTICE_PAGE_EDIT_BUTTON_TITLE,
  NOTICE_PAGE_ICON_SIZE,
} from './noticePage.settings';

export const NoticePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [notice, setNotice] = useState<NoticeParams>();
  const [city, setCity] = useState<CitiesParams>();
  const [fetchUser, setFetchUser] = useState<UserParams>();
  const [getNoticeByIdTrigger] = useLazyGetNoticeByIdQuery();
  const [getUserCityTrigger] = useLazyGetUserCityQuery();
  const [getUserByIdTrigger] = useLazyGetUserByIdQuery();
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const noticeData = await getNoticeByIdTrigger({ id: id || '' }, false);
    const fetchUser = await getUserByIdTrigger(
      { id: noticeData.data?.userId || '' },
      false,
    );
    const cityData = await getUserCityTrigger(
      { cityId: fetchUser.data?.cityId || '' },
      false,
    );
    setFetchUser(fetchUser.data);
    setNotice(noticeData.data);
    setCity(cityData.data || ({} as CitiesParams));
  }, [getNoticeByIdTrigger, getUserByIdTrigger, getUserCityTrigger, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleEditButton = () => {
    navigate(`/edit-notice/${id}`);
  };
  return (
    <div className={'px-32'}>
      <div className={'flex'}>
        <WhiteCard className={'flex m-4 w-2/3 mx-10'}>
          <NoticeBannerCard photos={notice?.photos || []} />
        </WhiteCard>
        <WhiteCard className={'flex m-4 w-1/2'}>
          <NoticeUserInfoCard city={city} user={fetchUser} />
        </WhiteCard>
        {notice?.userId === user?.id && (
          <div className={'fixed right-10 bottom-10'}>
            <CustomButton
              onClick={handleEditButton}
              title={NOTICE_PAGE_EDIT_BUTTON_TITLE}>
              <FiEdit size={NOTICE_PAGE_ICON_SIZE} />
            </CustomButton>
          </div>
        )}
      </div>
      <NoticeInfoCard notice={notice} />
    </div>
  );
};
