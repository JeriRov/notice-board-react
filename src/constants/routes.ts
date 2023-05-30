import { FC } from 'react';

import { SignInPage } from '../pages/AuthPage/SignIn/SignIn';
import { SignUpPage } from '../pages/AuthPage/SignUp/SignUp';
import { HomePage } from '../pages/HomePage/HomePage';
import { NoticeBoardPage } from '../pages/NoticeBoardPage/NoticeBoardPage';
import { NoticePage } from '../pages/NoticePage/NoticePage';
import { EditNoticePage } from '../pages/SellPage/EditNoticePage/EditNoticePage';
import { SellPage } from '../pages/SellPage/SellPage';

interface RouteItem {
  path: string;
  Element: FC;
  private?: boolean;
}

export const routes: Record<string, RouteItem> = {
  homePage: {
    path: '/',
    Element: HomePage,
  },
  signUp: {
    path: '/sign-up',
    Element: SignUpPage,
  },
  signIn: {
    path: '/sign-in',
    Element: SignInPage,
  },
  sell: {
    path: '/sell',
    Element: SellPage,
    private: true,
  },
  singleNotice: {
    path: '/notices/:id',
    Element: NoticePage,
  },
  notices: {
    path: '/notices',
    Element: NoticeBoardPage,
  },
  editNotices: {
    path: '/edit-notice/:id',
    Element: EditNoticePage,
    private: true,
  },
};
