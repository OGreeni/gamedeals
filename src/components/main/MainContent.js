import React from 'react';
import MainNav from './MainNav';
import MainTitle from './MainTitle';
import MainForm from './MainForm';
import FetchDeals from '../api-logic/FetchDeals';

const MainContent = () => {
  return (
    <>
      <MainNav />
      <MainTitle />
      <MainForm />
      <FetchDeals />
    </>
  );
};

export default MainContent;
