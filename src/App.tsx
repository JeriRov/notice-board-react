import React, { useEffect } from 'react';

import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { routes } from './constants/routes';
import { PrivateRoute } from './containers/PrivateRoute/PrivateRoute';

export const App = () => {
  const isGlobalFeedPage = useMatch(routes.homePage.path);
  const navigate = useNavigate();
  const auth = {
    isLoggedIn: true,
  };

  useEffect(() => {
    if (isGlobalFeedPage && auth.isLoggedIn) {
      navigate(routes.homePage.path);
    }
  }, [auth.isLoggedIn, isGlobalFeedPage, navigate]);

  return (
    <div className="min-h-screen font-poppins">
      <Header />
      <Routes>
        {Object.values(routes).map(route => {
          if (route.private) {
            return (
              <Route
                element={
                  <PrivateRoute>
                    <route.Element />
                  </PrivateRoute>
                }
                key={`route-${route.path}`}
                path={route.path}
              />
            );
          }
          return (
            <Route
              element={<route.Element />}
              key={`route-${route.path}`}
              path={route.path}
            />
          );
        })}
      </Routes>
    </div>
  );
};
