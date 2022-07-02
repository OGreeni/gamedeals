import React, { useState } from 'react';

const MainForm = () => {
  const [formUserInput, setFormUserInput] = useState('');
  const formSubmitHandler = (e) => {
    e.preventDefault();
    setFormUserInput('');
  };
  const inputChangeHandler = (e) => {
    setFormUserInput(e.target.value);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <input type="text" onChange={inputChangeHandler} value={formUserInput} />
      <button>Search</button>
    </form>
  );
};

export default MainForm;
