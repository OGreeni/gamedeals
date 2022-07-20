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

const DealCard = (props) => {
  const [saveDeal, setSaveDeal] = useState(false);
  const [notifyClicks, setNotifyClicks] = useState(0); // num of clicks on notify (THINK OF BETTER WAY)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const uiTheme = useSelector((state) => state.theme.uiTheme);
  const navigate = useNavigate();
  const dealId = props.cheapestDealID;

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
        await response.json();
      } else {
        // delete saved deal from db
        await fetch(`deals/remove-deal?userId=${userId}&dealId=${dealId}`, {
          method: 'DELETE',
        });
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
      `https://www.cheapshark.com/redirect?dealID=${props.cheapestDealID}`,
      '_blank'
    );
  };
  return (
    <Container fluid>
      <Card className={uiTheme === 'dark' ? 'bg-dark text-white' : null}>
        <Card.Header>
          <img alt="deal thumb" src={props.thumb} className="deal-image" />
          {props.external}
        </Card.Header>
        <Card.Body>
          <Card.Title>{props.external}</Card.Title>
          <Card.Text>Lowest price: ${props.cheapest}</Card.Text>
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
