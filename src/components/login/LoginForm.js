import React from 'react';
import { Container, Form, Button, Row } from 'react-bootstrap';

const LoginForm = () => {
  const formSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Container className="container">
      <Form onSubmit={formSubmitHandler}>
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
          <Button variant="primary" size="md">
            Login
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default LoginForm;
