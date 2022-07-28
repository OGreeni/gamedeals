import React from 'react';
import SearchTitle from './SearchTitle';
import SearchForm from './SearchForm';
import FetchDeals from '../fetch/FetchDeals';

const SearchContent = () => {
  return (
    <>
      <SearchTitle />
      <SearchForm />
      <FetchDeals />
    </>
  );
};

export default SearchContent;
