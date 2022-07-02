import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainContent from './components/index/MainContent';
import AboutContent from './components/about/AboutContent';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
    </Routes>
  );
};

export default App;
