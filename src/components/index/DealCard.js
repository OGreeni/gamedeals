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

// https://www.cheapshark.com/api/1.0/deals?id=X8sebHhbc1Ga0dTkgg59WgyM506af9oNZZJLU9uSrX8%3D
// use this endpoint to later fetch deal by ID
const DealCard = ({ dealData }) => {
  const [saveDeal, setSaveDeal] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const dealId = dealData.dealID;

  const notifyClickHandler = async () => {
    if (isLoggedIn) {
      const response = await fetch('deals/save-deal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, dealId }),
      });
      const result = await response.json();
      console.log(result.message);
      setSaveDeal(true);
    } else {
      navigate('/login');
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {saveDeal ? 'User will be notified of sales' : 'Get notified of sales'}
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
