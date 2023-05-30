import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../index';

import { AuthState, AuthResponseParams } from './auth.types';

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthResponseParams | null>) => {
      if (action.payload === null) {
        state.user = null;
        return;
      }

      state.user = {
        ...action.payload,
      };
    },
  },
});

export const selectUser = (state: RootState) => state.auth.user;

export const { setUser } = authSlice.actions;
