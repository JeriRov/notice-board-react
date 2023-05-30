import { createApi } from '@reduxjs/toolkit/query/react';

import {
  ByIdParams,
  CitiesParams,
  CityParams,
} from '../../store/notices/notices.types';
import { UserParams } from '../../store/user/user.types';
import { apiBaseQuery } from '../api/baseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: apiBaseQuery,
  endpoints: builder => ({
    getUserById: builder.query<UserParams, ByIdParams>({
      query: ({ id }) => ({
        url: `/users/${id}`,
      }),
    }),
    getUserCity: builder.query<CitiesParams, CityParams>({
      query: ({ cityId }) => ({
        url: `/users/city/${cityId}`,
      }),
    }),
  }),
});

export const { useLazyGetUserCityQuery, useLazyGetUserByIdQuery } = userApi;
