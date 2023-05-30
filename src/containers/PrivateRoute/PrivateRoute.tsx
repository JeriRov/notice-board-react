import { FC, PropsWithChildren } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from '../../store/auth/useAuth';

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    return <Navigate replace={true} to="/sign-in" />;
  }

  return <div>{children}</div>;
};
