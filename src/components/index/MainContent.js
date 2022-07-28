import React from 'react';
import MainTitle from './MainTitle';
import MainCarousel from './MainCarousel';
import MainForm from './MainForm';
import FetchDeals from '../fetch/FetchDeals';

const MainContent = () => {
  return (
    <>
      <MainTitle />
      <MainCarousel />
      <MainForm />
      <FetchDeals />
    </>
  );
};

export default MainContent;
