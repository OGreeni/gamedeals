import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import ark from '../../images/ark.jpg';
import subnautica from '../../images/subnautica.png';
import mcdungeons from '../../images/mcdungeons.jpg';

import './MainCarousel.css';

const MainCarousel = () => {
  return (
    <Container fluid>
      <Carousel className="main-carousel">
        <Carousel.Item>
          <img className="d-block w-100" src={ark} alt="First slide" />
          <Carousel.Caption>
            <h1>Effortless search</h1>
            <p>
              Enter games to the form below to immediately find the best deals.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={mcdungeons} alt="Second slide" />

          <Carousel.Caption>
            <h1>Awesome deals</h1>
            <p>
              Get the best prices out there, compared across various, trusted
              sellers.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={subnautica} alt="Third slide" />

          <Carousel.Caption>
            <h1>Get notified of sales</h1>
            <p>
              Save games to your account to get notified every time they go on
              sale.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default MainCarousel;
