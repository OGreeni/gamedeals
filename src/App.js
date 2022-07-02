import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainContent from './components/main/MainContent';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
    </Routes>
  );
};

export default App;
