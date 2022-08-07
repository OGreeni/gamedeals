import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Modal } from 'react-bootstrap';

import { updatePriceAlerts } from '../../../api/priceAlerts';

import './NotifyButton.css';

const NotifyButton = ({ gameData, initialState }) => {
  const [pressed, setPressed] = useState(initialState);
  const [show, setShow] = useState(false);
  const userId = useSelector((state) => state.auth.userId);
  const uiTheme = useSelector((state) => state.theme.uiTheme);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (!pressed) {
      setShow(true);
    }
    updatePriceAlerts({
      userId,
      gameTitle: gameData.external,
      gameId: gameData.gameID,
      currentPrice: gameData.cheapest,
    });
    setPressed((prevState) => !prevState);
  };

  return (
    <>
      <Button variant={!pressed ? 'warning' : 'light'} onClick={handleShow}>
        {!pressed ? 'Add Updates' : 'Remove Updates'}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        className={uiTheme === 'light' ? 'modal-light' : 'modal-dark'}
      >
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Price updates for{' '}
          <span className="game-title">{gameData.external}</span> will be sent
          to your email address
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NotifyButton;
