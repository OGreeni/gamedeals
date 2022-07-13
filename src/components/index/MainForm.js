import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

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
    <form onSubmit={formSubmitHandler}>
      <input
        type="text"
        onChange={inputChangeHandler}
        value={formUserInput}
        required
      />
      <button>Search</button>
    </form>
  );
};

export default MainForm;
