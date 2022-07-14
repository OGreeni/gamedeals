import React from 'react';

const LoginForm = () => {
  const formSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <label htmlFor="email">Email</label>
      <input type="text" names="email"></input>
      <label htmlFor="password">Password</label>
      <input type="password" names="password"></input>
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
