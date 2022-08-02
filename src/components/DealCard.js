import React, { useEffect, useState } from 'react';
import {
  Card,
  Container,
  Button,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { dealsActions } from '../store/store';

import './DealCard.css';

const DealCard = (props) => {
  const [dealSaved, setDealSaved] = useState(false);
  const dealId = decodeURIComponent(props.cheapsetDealId);
  const savedDealsArray = props.savedDealsArray;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const uiTheme = useSelector((state) => state.theme.uiTheme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    for (const deal of savedDealsArray) {
      if (deal.dealTitle === props.external) {
        setDealSaved(true);
      }
    }

    // eslint-disable-next-line
  }, [savedDealsArray]);

  const goToSiteHandler = () => {
    window.open(
      `https://www.cheapshark.com/redirect?dealID=${dealId}`,
      '_blank'
    );
  };

  const saveDealHandler = async () => {
    if (!isLoggedIn) {
      return navigate('/login');
    }
    if (dealSaved) {
      await fetch(
        `deals/remove-deal?userId=${userId}&dealTitle=${props.external}`,
        {
          method: 'DELETE',
        }
      );
      setDealSaved(false);
      dispatch(dealsActions.saveDealUpdater());
    } else {
      // save
      console.log(userId);
      console.log(dealId);
      await fetch(
        `deals/save-deal?userId=${userId}&dealTitle=${props.external}`,
        {
          method: 'POST',
        }
      );
      setDealSaved(true);
      dispatch(dealsActions.saveDealUpdater());
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {dealSaved ? 'Game saved to account' : 'Save game to account'}
    </Tooltip>
  );

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
            onClick={goToSiteHandler}
          >
            Go to site
          </Button>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <Button
              variant={dealSaved ? 'light' : 'info'}
              className="card-button"
              onClick={saveDealHandler}
            >
              {dealSaved ? 'Saved' : 'Save'}
            </Button>
          </OverlayTrigger>
        </Card.Body>
      </Card>
      <br />
    </Container>
  );
};

export default DealCard;
