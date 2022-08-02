import React from 'react';
import Container from 'react-bootstrap/Container';

import './NotFound.css';

const NotFound = () => {
  return (
    <>
      <br />
      <Container className="text-center">
        <h1 className="not-found-title">🎮 404 Page Not Found 🎮</h1>
        <br />
        <h4 className="not-found-desc">
          Please double check your path if you entered it manually. Otherwise,
          this page has probably been deleted.
        </h4>
      </Container>
    </>
  );
};

export default NotFound;
