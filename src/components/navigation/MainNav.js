import React, { useState } from 'react';
import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MainNav = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const logoutClickHandler = () => setShowModal(true);
  const modalCloseHandler = () => setShowModal(false);
  return (
    <>
      <Container fluid>
        <Navbar bg="light" variant="light" sticky="top">
          <Navbar.Brand>GameDeals</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/about')}>About</Nav.Link>
            <Nav.Link onClick={() => navigate('/register')}>Register</Nav.Link>
            <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
            <Nav.Link onClick={logoutClickHandler}>Logout</Nav.Link>
            <Nav.Link onClick={() => navigate('/account')}>Account</Nav.Link>
          </Nav>
        </Navbar>
      </Container>

      <Modal show={showModal} onHide={modalCloseHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really wish to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalCloseHandler}>
            Close
          </Button>
          <Button variant="danger" onClick={modalCloseHandler}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    // <Link to="/">Home</Link>
    // <Link to="about">About</Link>
    // <Link to="login">Login</Link>
    // <Link to="register">Register</Link>
  );
};

export default MainNav;
