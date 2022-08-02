import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const MoreInfoModal = (props) => {
  const uiTheme = useSelector((state) => state.theme.uiTheme);

  const dealInfo = props.deal.gameInfo;
  const date = new Date(dealInfo.releaseDate * 1000); // unix timestamp

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
        <h4>{dealInfo.name}</h4>
        <p>
          <ul>
            <li>Release date: {date.toLocaleDateString('en-US')}</li>
            {dealInfo.steamRatingText && (
              <li>
                Steam rating: {dealInfo.steamRatingText},{' '}
                {dealInfo.steamRatingCount} reviews
              </li>
            )}
          </ul>
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
