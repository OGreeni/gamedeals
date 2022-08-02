import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import './MoreInfoModal.css';

const MoreInfoModal = (props) => {
  const uiTheme = useSelector((state) => state.theme.uiTheme);

  const dealInfo = props.deal[0];

  const cheapestRedirectHandler = () => {
    window.open(
      `https://www.cheapshark.com/redirect?dealID=${dealInfo.cheapestDealID}`
    );
  };

  const steamRedirectHandler = () => {
    window.open(
      `https://store.steampowered.com/app/${dealInfo.steamAppID}`,
      '_blank'
    );
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={uiTheme === 'light' ? 'modal-light' : 'modal-dark'}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Game Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{dealInfo.external}</h4>
        <p className="info-modal-body">
          Cheapest price (current):{' '}
          <span className="info-modal-price" onClick={cheapestRedirectHandler}>
            ${dealInfo.cheapest}
          </span>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={steamRedirectHandler} variant="primary">
          Steam Page
        </Button>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MoreInfoModal;
