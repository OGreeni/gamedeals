import React from 'react';
import {
  Container,
  Button,
  Card,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';

import './DealCard.css';

const DealCard = ({ dealData }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Get notified of sales
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
            <Button variant="info" className="card-button">
              Notify me
            </Button>
          </OverlayTrigger>
        </Card.Body>
      </Card>
      <br />
    </Container>
  );
};

export default DealCard;
