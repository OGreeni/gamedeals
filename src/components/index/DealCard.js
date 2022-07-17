import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Button,
  Card,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';

import './DealCard.css';

// https://www.cheapshark.com/api/1.0/deals?id=SOME_ID
// use this endpoint to later fetch deal by ID
const DealCard = ({ dealData }) => {
  const [saveDeal, setSaveDeal] = useState(false);
  const [notifyClicks, setNotifyClicks] = useState(0); // num of clicks on notify (THINK OF BETTER WAY)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const dealId = dealData.cheapestDealID;

  const notifyClickHandler = async () => {
    setSaveDeal((prevState) => !prevState);
    setNotifyClicks((prevState) => (prevState += 1));
    if (isLoggedIn) {
      if (notifyClicks % 2 === 0) {
        const response = await fetch(
          `deals/save-deal?userId=${userId}&dealId=${dealId}`,
          {
            method: 'POST',
          }
        );
        const result = await response.json();
      } else {
        // delete saved deal from db
        const response = await fetch(
          `deals/remove-deal?userId=${userId}&dealId=${dealId}`,
          { method: 'DELETE' }
        );
      }
    } else {
      navigate('/login');
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {saveDeal ? 'You will be notified of sales' : 'Get notified of sales'}
    </Tooltip>
  );

  const buttonClickHandler = () => {
    window.open(
      `https://www.cheapshark.com/redirect?dealID=${dealData.cheapestDealID}`,
      '_blank'
    );
  };
  return (
    <Container fluid>
      <Card>
        <Card.Header>Deal</Card.Header>
        <Card.Body>
          <Card.Title>{dealData.external}</Card.Title>
          <Card.Text>Lowest price: ${dealData.cheapest}</Card.Text>
          <Button
            variant="secondary"
            className="card-button"
            onClick={buttonClickHandler}
          >
            Go to site
          </Button>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <Button
              variant={saveDeal ? 'light' : 'info'}
              className="card-button"
              onClick={notifyClickHandler}
            >
              {saveDeal ? 'Saved' : 'Notify'}
            </Button>
          </OverlayTrigger>
        </Card.Body>
      </Card>
      <br />
    </Container>
  );
};

export default DealCard;
