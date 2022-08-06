import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Row } from 'react-bootstrap';

import { dealsActions } from '../../../store/store';

import './GameForm.css';

const GameForm = () => {
  const dispatch = useDispatch();
  const [formUserInput, setFormUserInput] = useState('');
  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(dealsActions.updateInput({ userInput: formUserInput }));
    setFormUserInput('');
  };
  const inputChangeHandler = (e) => {
    setFormUserInput(e.target.value);
  };

  return (
    <>
      <Form onSubmit={formSubmitHandler}>
        <Row className="justify-content-center">
          <Form.Group controlId="gameInput" className="mb-3 w-75 p3">
            <Form.Label className="main-form-label">
              Enter game to look up
            </Form.Label>

            <Form.Control
              type="text"
              placeholder="Minecraft Dungeons"
              onChange={inputChangeHandler}
              value={formUserInput}
            />
          </Form.Group>
        </Row>
        <div className="text-center">
          <Button variant="primary" type="submit" size="lg">
            Get deals
          </Button>
        </div>
        <br />
      </Form>
    </>
  );
};

export default GameForm;
