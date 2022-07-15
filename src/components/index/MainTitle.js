import React from 'react';
import Container from 'react-bootstrap/Container';
import './MainTitle.css';

const MainTitle = () => {
  return (
    <Container fluid className="text-center">
      <h1 className="main-title">GameDeals</h1>
      <h2 className="main-desc">Find the best deals around</h2>
    </Container>
  );
};

export default MainTitle;
