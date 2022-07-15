import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Row } from 'react-bootstrap';

import { dealsActions } from '../../store/store';

const MainForm = () => {
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
    <Form onSubmit={formSubmitHandler}>
      <Row className="justify-content-center">
        <Form.Group controlId="gameInput" className="mb-3 w-75 p3">
          <Form.Label>Enter game to look up</Form.Label>
          <Form.Control
            type="text"
            placeholder="Minecraft, Call of Duty, etc."
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

    // <form onSubmit={formSubmitHandler}>
    //   <input
    //     type="text"
    //     onChange={inputChangeHandler}
    //     value={formUserInput}
    //     required
    //   />
    //   <button>Search</button>
    // </form>
  );
};

export default MainForm;
