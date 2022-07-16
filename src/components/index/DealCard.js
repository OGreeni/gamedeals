import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';

const DealCard = ({ dealData }) => {
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
          <Button variant="secondary" onClick={buttonClickHandler}>
            Go to site
          </Button>
        </Card.Body>
      </Card>
      <br />
    </Container>
  );

  // return (
  //   <article>
  //     <div>{dealData.external}</div>
  //     <div>${dealData.cheapest}</div>
  //   </article>
  // );
};

export default DealCard;
