import React, { useState } from 'react';
import { Form, Button, Row, Alert, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authActions } from '../../store/store';
import './LoginForm.css';

const LoginForm = () => {
  const [resSuccessMessage, setResSuccessMessage] = useState('');
  const [resFailMessage, setResFailMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState('');
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setResSuccessMessage('');
    setResFailMessage('');
    setIsLoading(true);
    fetch('/auth/login', {
      method: 'POST',
      body: new FormData(document.getElementById('loginFormEl')),
    })
      .then((response) => {
        if (response.ok) {
          setApiResponse(response);
          response.json().then((result) => {
            setUserId(result.user._id);
            setResSuccessMessage(result.message);
            setTimeout(() => navigate('/'), 500);
          });
        } else {
          response.json().then((result) => setResFailMessage(result.message));
        }
        setIsLoading(false);
      })
      .catch(
        (err) => {
          setResFailMessage('Login failed. Please try again later');
          setIsLoading(false);
        } // server down
      );
  };

  if (apiResponse.ok) {
    setTimeout(() => dispatch(authActions.loginUser({ userId })), 750);
  }

  return (
    <>
      <br />
      <Form
        onSubmit={formSubmitHandler}
        id="loginFormEl"
        className="login-form"
      >
        <Row className="justify-content-center">
          <h1 className="login-title text-center">🕹️ Login 🕹️</h1>
          <Form.Group className="mb-3 w-50 p3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              size="md"
              type="email"
              name="email"
              placeholder="Enter email"
            />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 w-50 p3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="md"
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>
        </Row>
        <div className="text-center">
          <Button variant="primary" size="md" type="submit">
            Login
          </Button>
        </div>
      </Form>
      <br />
      {resSuccessMessage && (
        <Row className="justify-content-center">
          <Alert variant="success" className="mb-3 w-50 p3">
            {resSuccessMessage}
          </Alert>
        </Row>
      )}
      {resFailMessage && (
        <Row className="justify-content-center">
          <Alert variant="danger" className="mb-3 w-50 p3">
            {resFailMessage}
          </Alert>
        </Row>
      )}
      {isLoading && (
        <Row className="justify-content-center">
          <Spinner animation="border" />
        </Row>
      )}
    </>
  );
};

export default LoginForm;
