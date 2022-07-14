import React, { useState } from 'react';

const SignUp = () => {
  const [resMessage, setResMessage] = useState('');

  const formSubmitHandler = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      body: new FormData(document.getElementById('formEl')),
    })
      .then((response) => response.json())
      .then((result) => setResMessage(result.message))
      .catch((err) => setResMessage('Signup failed. Please try again'));
  };
  return (
    <>
      <form id="formEl" onSubmit={formSubmitHandler}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email"></input>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username"></input>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password"></input>
        <button>Sign up</button>
      </form>
      {resMessage && <p>{resMessage}</p>}
    </>
  );
};

export default SignUp;
