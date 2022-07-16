import React, { useState } from 'react';
import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '../../store/store';

import './MainNav.css';

const MainNav = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  return (
    <>
      <Container fluid>
        <Navbar bg="light" variant="light" sticky="top">
          <Container>
            <Navbar.Brand
              className="navbar-brand"
              onClick={() => navigate('/')}
            >
              GameDeals
            </Navbar.Brand>
          </Container>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/about/')}>About</Nav.Link>
            {!isLoggedIn && (
              <Nav.Link onClick={() => navigate('/register')}>
                Register
              </Nav.Link>
            )}
            {!isLoggedIn && (
              <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
            )}
            {isLoggedIn && (
              <>
                <Nav.Link onClick={() => setShowModal(true)}>Logout</Nav.Link>
                <Nav.Link onClick={() => navigate(`/account/${userId}`)}>
                  Account
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really wish to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              dispatch(authActions.logoutUser()); // UX ONLY
              setShowModal(false);
              navigate('/');
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MainNav;
