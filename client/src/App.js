import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import MainNav from './components/MainNav';
import Index from './pages/Home/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account/Account';
import NotFound from './pages/NotFound';

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const uiTheme = useSelector((state) => state.theme.uiTheme);

  return (
    <>
      <Helmet>
        <style>
          {`body {background-color: ${
            uiTheme === 'light' ? 'white' : '#404040'
          }; color: ${uiTheme === 'light' ? 'black' : 'white'}      
        }`}
        </style>
      </Helmet>
      <MainNav />
      <Routes>
        <Route path="/" element={<Index />} />
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        {isLoggedIn && (
          <Route path={`/account/${userId}`} element={<Account />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
