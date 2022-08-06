import React from 'react';

import { Button } from 'react-bootstrap';

const NotifyButton = () => {
  const notifyClickHandler = () => {
    // render tooltip
    // choose price
  };

  return (
    <Button variant="warning" onClick={notifyClickHandler}>
      Get Notified
    </Button>
  );
};

export default NotifyButton;
