import { createApi } from '@reduxjs/toolkit/query/react';

import {
  SignInRequestParams,
  SignUpRequestParams,
  AuthResponseParams,
  AuthEndpoints,
} from '../../store/auth/auth.types';
import { apiBaseQuery } from '../api/baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: apiBaseQuery,
  endpoints: builder => ({
    signUp: builder.query<AuthResponseParams, SignUpRequestParams>({
      query: args => {
        const data: SignUpRequestParams = {
          ...args,
        };
        return {
          url: AuthEndpoints.REGISTER,
          method: 'post',
          data,
        };
      },
    }),

    signIn: builder.query<AuthResponseParams, SignInRequestParams>({
      query: args => {
        const data = {
          ...args,
        };

        return {
          url: AuthEndpoints.LOGIN,
          method: 'post',
          data,
        };
      },
    }),
  }),
});

export const { useLazySignUpQuery, useLazySignInQuery } = authApi;
