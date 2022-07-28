import React from 'react';
import Container from 'react-bootstrap/Container';
import './SearchTitle.css';

const SearchTitle = () => {
  return (
    <>
      <br />
      <Container fluid className="text-center search-title-container">
        <h1 className="search-title">🎮 GameDeals 🎮</h1>
        <h2 className="search-desc">Find the best deals out there.</h2>
      </Container>
    </>
  );
};

export default SearchTitle;
