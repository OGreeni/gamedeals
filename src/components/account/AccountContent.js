import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spinner, Container, Row, Card, Button } from 'react-bootstrap';

import MoreInfoModal from './MoreInfoModal';
import './AccountContent.css';

// TODO: 'More Info' button navigates to a page with more information about the game, specifically the
// deal info extracted from the API

const AccountContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null); // {}
  const [savedDeals, setSavedDeals] = useState(null); // []
  const [modalShow, setModalShow] = useState(false);
  const [clickedDealInfo, setClickedDealInfo] = useState(null);
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
    console.log(savedDeals);
    savedDeals.filter((deal) => !Array.isArray(deal));
    return (
      <>
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
          {savedDeals.length < 1 && (
            <h4 className="account-favorites text-center">No games saved.</h4>
          )}
          {savedDeals.length > 0 &&
            savedDeals.map((deal, i) => (
              <>
                <Card
                  body
                  key={i}
                  className={
                    uiTheme === 'dark' ? 'account-card bg-dark' : 'account-card'
                  }
                >
                  <Container className="card-content-container">
                    {deal[0].external}
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setModalShow(true);
                        setClickedDealInfo(deal);
                      }}
                    >
                      More Info
                    </Button>
                  </Container>
                </Card>
              </>
            ))}
        </Container>
        {clickedDealInfo && (
          <MoreInfoModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            deal={clickedDealInfo}
          />
        )}
      </>
    );
  }
};
export default AccountContent;
