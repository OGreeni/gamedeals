import React from 'react';
import Container from 'react-bootstrap/Container';

import './AboutContent.css';

const AboutContent = () => {
  return (
    <Container className="text-center">
      <h1 className="about-title">About Page</h1>
      <p className="about-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </Container>
  );
};

export default AboutContent;
