import React from 'react';
import { Link } from 'react-router-dom';

const MainNav = () => {
  return (
    <nav>
      <Link to="about">About</Link>
      <Link to="login">Login</Link>
      <Link to="signup">Signup</Link>
    </nav>
  );
};

export default MainNav;
