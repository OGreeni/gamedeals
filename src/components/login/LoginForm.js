import React, { useState } from 'react';
import { Form, Button, Row, Alert, Spinner } from 'react-bootstrap';

const LoginForm = () => {
  const [resSuccessMessage, setResSuccessMessage] = useState('');
  const [resFailMessage, setResFailMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
          response
            .json()
            .then((result) => setResSuccessMessage(result.message));
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
  return (
    <>
      <br />
      <Form onSubmit={formSubmitHandler} id="loginFormEl">
        <Row className="justify-content-center">
          <Form.Group className="mb-3 w-50 p3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control size="md" type="email" placeholder="Enter email" />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group className="mb-3 w-50 p3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control size="md" type="password" placeholder="Password" />
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
    </>
  );
};

export default LoginForm;
