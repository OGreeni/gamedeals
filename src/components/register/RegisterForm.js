import React, { useState } from 'react';
import { Form, Button, Alert, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { authActions } from '../../store/store';
import './RegisterForm.css';

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resSuccessMessage, setResSuccessMessage] = useState('');
  const [resFailMessage, setResFailMessage] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [userId, setUserId] = useState('');
  const uiTheme = useSelector((state) => state.theme.uiTheme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResSuccessMessage('');
    setResFailMessage('');
    fetch('/auth/register', {
      method: 'POST',
      body: new FormData(document.getElementById('registerFormEl')),
    })
      .then((response) => {
        setApiResponse(response);
        if (response.ok) {
          response.json().then((result) => {
            setResSuccessMessage(result.message);
            setTimeout(() => navigate('/'), 500);
          });
        } else {
          response.json().then((result) => {
            setResFailMessage(result.message);
            setUserId(result.user._id);
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setResFailMessage('Registration failed. Please try again later');
        setIsLoading(false);
      });
  };

  if (apiResponse.ok) {
    setTimeout(() => dispatch(authActions.loginUser({ userId })), 750);
  }

  return (
    <>
      <Form
        id="registerFormEl"
        onSubmit={formSubmitHandler}
        className="register-form"
      >
        <br />
        <Row className="justify-content-center">
          <h1 className="register-title text-center">
            🎮 Register to GameDeals 🎮
          </h1>
          <Form.Group className="mb-3 w-50 p3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 w-50 p3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" placeholder="Username" />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 w-50 p3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 w-50 p3" controlId="formPassConfirm">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              name="passconfirm"
              placeholder="Password"
            />
          </Form.Group>
        </Row>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Register
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
      <h5 className="text-center have-account-text">
        Already have an account?{' '}
        <Link
          to="/login"
          className={
            uiTheme === 'light' ? 'login-link-dark' : 'login-link-light'
          }
        >
          Log in
        </Link>
      </h5>
      <br />
    </>
  );
};

export default RegisterForm;
