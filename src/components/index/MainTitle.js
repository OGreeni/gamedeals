import React from 'react';
import Container from 'react-bootstrap/Container';
import './MainTitle.css';

const MainTitle = () => {
  return (
    <>
      <br />
      <Container fluid className="text-center main-title-container">
        <h1 className="main-title">🕹️ GameDeals 🕹️</h1>
        <h2 className="main-desc">Get deals, get notified of sales.</h2>
      </Container>
    </>
  );
};

export default MainTitle;
