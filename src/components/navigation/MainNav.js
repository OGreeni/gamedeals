import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

const MainNav = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">GameDeals</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="about">About</Nav.Link>
          <Nav.Link href="login">Login</Nav.Link>
          <Nav.Link href="register">Register</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    // <Link to="/">Home</Link>
    // <Link to="about">About</Link>
    // <Link to="login">Login</Link>
    // <Link to="register">Register</Link>
  );
};

export default MainNav;
