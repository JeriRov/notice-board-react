import {
  useLazySignInQuery,
  useLazySignUpQuery,
} from '../../services/auth/authApi';
import { useAppDispatch, useAppSelector } from '../index';

import { selectUser, setUser } from './authSlice';

import { SignInRequestParams, SignUpRequestParams } from './auth.types';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isLoggedIn = Boolean(user);

  const [triggerSignInQuery] = useLazySignInQuery();
  const signIn = async (values: SignInRequestParams) => {
    const { data } = await triggerSignInQuery(values, false);

    if (!data) {
      throw new Error('No data in query');
    }

    dispatch(setUser(data));
  };

  const [triggerSignUpQuery] = useLazySignUpQuery();
  const signUp = async (values: SignUpRequestParams) => {
    const { data } = await triggerSignUpQuery(values, false);

    if (!data) {
      throw new Error('No data in query');
    }
    dispatch(setUser(data));
  };

  const logOut = () => {
    dispatch(setUser(null));
  };

  return { isLoggedIn, signIn, signUp, logOut, user };
};
