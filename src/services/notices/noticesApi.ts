import { createApi } from '@reduxjs/toolkit/query/react';

import { NOTICE_PAGE_SIZE } from '../../pages/NoticeBoardPage/NoticeBoard/noticeBoard.settings';
import {
  ByIdParams,
  CategoriesResponseParams,
  CitiesResponseParams,
  NoticeBoardDataParams,
  NoticeParams,
  NoticeQueryParams,
  NoticesEndpoints,
} from '../../store/notices/notices.types';
import { apiBaseQuery } from '../api/baseQuery';

export const noticesApi = createApi({
  reducerPath: 'noticesApi',
  baseQuery: apiBaseQuery,
  endpoints: builder => ({
    getCategories: builder.query<CategoriesResponseParams, undefined>({
      query: () => ({
        url: NoticesEndpoints.CATEGORIES,
      }),
    }),
    getCities: builder.query<CitiesResponseParams, undefined>({
      query: () => ({
        url: NoticesEndpoints.CITIES,
      }),
    }),
    getSearchCities: builder.query<CitiesResponseParams, NoticeQueryParams>({
      query: ({ search }) => ({
        url: `${NoticesEndpoints.CITIES}/${search}`,
      }),
    }),
    getNoticeById: builder.query<NoticeParams, ByIdParams>({
      query: ({ id }) => ({
        url: `${NoticesEndpoints.NOTICES}/${id}`,
      }),
    }),
    getNotices: builder.query<NoticeBoardDataParams, NoticeQueryParams>({
      query: ({
        page,
        isPersonalNotices,
        category,
        city,
        search,
        maxPrice,
        minPrice,
      }) => ({
        url: isPersonalNotices ? '/notices/personal' : NoticesEndpoints.NOTICES,
        params: {
          limit: NOTICE_PAGE_SIZE,
          offset: page && page * NOTICE_PAGE_SIZE,
          category,
          city,
          search,
          maxPrice,
          minPrice,
        },
      }),
    }),

    createNotice: builder.mutation<NoticeParams, NoticeParams>({
      query: ({ title, description, city, userId, item, photos, featured }) => {
        const data: NoticeParams = {
          dateAdded: Date.now().toString(),
          title,
          city,
          description,
          item,
          userId,
          photos,
          featured,
        };

        return {
          url: NoticesEndpoints.NOTICES,
          method: 'post',
          data,
        };
      },
    }),
    updateNotice: builder.mutation<NoticeParams, NoticeParams>({
      query: ({
        _id,
        title,
        description,
        city,
        userId,
        dateAdded,
        item,
        photos,
        featured,
      }) => {
        const data: NoticeParams = {
          dateAdded,
          city,
          description,
          item,
          title,
          userId,
          photos,
          featured,
        };

        return {
          url: `${NoticesEndpoints.NOTICES}/${_id}`,
          method: 'put',
          data,
        };
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCitiesQuery,
  useGetNoticeByIdQuery,
  useLazyGetNoticeByIdQuery,
  useGetNoticesQuery,
  useLazyGetSearchCitiesQuery,
  useCreateNoticeMutation,
  useUpdateNoticeMutation,
} = noticesApi;
