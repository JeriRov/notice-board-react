import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';

import { RootState } from '../../store';
import { authSlice } from '../../store/auth/authSlice';

export const axiosBaseQuery =
  (
    { baseUrl } = { baseUrl: '' },
  ): BaseQueryFn<{
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  }> =>
  async ({ url, method = 'get', data, params }, { getState }) => {
    const state = getState() as RootState;
    const token = state[authSlice.name].user?.accessToken;

    try {
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const apiBaseQuery = axiosBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL as string,
});
