import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import MainNav from './components/navigation/MainNav';
import MainContent from './components/index/MainContent';
import AboutContent from './components/about/AboutContent';
import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/register/RegisterForm';
import AccountContent from './components/account/AccountContent';

const App = () => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // TODO: dynamically update routes based on login status

  return (
    <>
      <MainNav />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/about" element={<AboutContent />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/account" element={<AccountContent />} />
      </Routes>
    </>
  );
};

export default App;
