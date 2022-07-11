import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainContent from './components/index/MainContent';
import AboutContent from './components/about/AboutContent';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/about" element={<AboutContent />} />
      <Route path="/login" element={<h1>PLACEHOLDER LOGIN</h1>} />
      <Route path="/signup" element={<h1>PLACEHOLDER SIGNUP</h1>} />
    </Routes>
  );
};

export default App;
