import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spinner, Container, Row, Card } from 'react-bootstrap';

import './AccountContent.css';

const AccountContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null); // {}
  const [savedDeals, setSavedDeals] = useState(null); // []
  const userId = useSelector((state) => state.auth.userId);
  const uiTheme = useSelector((state) => state.theme.uiTheme);
  const saveDealUpdater = useSelector((state) => state.deals.saveDealUpdater);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const response = await fetch(`/account/${userId}`);
      if (response.ok) {
        const result = await response.json();
        setUserData(result.user);
        setSavedDeals(result.dealsArray);
      }
      setIsLoading(false);
    };
    fetchUserData();
  }, [userId, saveDealUpdater]);

  if (isLoading) {
    return (
      <>
        <br />
        <Container className="spinner-container">
          <Row className="justify-content-center">
            <Spinner animation="border" />
          </Row>
        </Container>
      </>
    );
  }
  if (userData) {
    savedDeals.filter((deal) => !Array.isArray(deal));
    return (
      <Container>
        <br />
        <br />
        <h1 className="account-title text-center">
          <span className="account-username">{userData.username}</span>'s
          Account Page
        </h1>
        <br />
        <h2 className="account-favorites text-center">Saved games:</h2>
        <br />
        {savedDeals.length > 0 &&
          savedDeals.map((deal, i) => (
            <>
              <Card
                body
                key={i}
                className={uiTheme === 'dark' ? 'bg-dark' : null}
              >
                {deal.gameInfo.name}
              </Card>
            </>
          ))}
      </Container>
    );
  }
};
export default AccountContent;

// ACCOUNT -- NOT LOADING SAVED GAMES
// INDEX -- DOESN'T SHOW IF GAME WAS ALREADY SAVED
