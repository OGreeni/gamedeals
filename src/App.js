import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainNav from './components/navigation/MainNav';
import MainContent from './components/index/MainContent';
import AboutContent from './components/about/AboutContent';

import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/signup/RegisterForm';

const App = () => {
  return (
    <>
      <MainNav />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/about" element={<AboutContent />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
};

export default App;
