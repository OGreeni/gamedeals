import React, { useState } from 'react';

const SignUp = () => {
  const [emailInput, setEmailInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', emailInput);
    formData.append('username', usernameInput);
    formData.append('password', passwordInput);
    fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      body: formData,
    });
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        onChange={(e) => {
          setEmailInput(e.target.value);
        }}
      ></input>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        onChange={(e) => {
          setUsernameInput(e.target.value);
        }}
      ></input>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        onChange={(e) => {
          setPasswordInput(e.target.value);
        }}
      ></input>
      <button>Sign up</button>
    </form>
  );
};

export default SignUp;
