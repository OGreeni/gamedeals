import React from 'react';
import MainTitle from './MainTitle';
import MainForm from './MainForm';
import FetchDeals from '../fetch/FetchDeals';

const MainContent = () => {
  return (
    <>
      <MainTitle />
      <MainForm />
      <FetchDeals />
    </>
  );
};

export default MainContent;
