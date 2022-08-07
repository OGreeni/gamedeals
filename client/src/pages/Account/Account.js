import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spinner, Container, Row, Card, Button } from 'react-bootstrap';

import MoreInfo from './components/MoreInfo';
import './Account.css';
import NotifyButton from './components/NotifyButton';

// TODO: WORK ON DEAL EMAIL ALERT FUNCTINOALITY

const Account = () => {
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
    const alertedDeals = userData.savedDeals
      .filter((deal) => deal.priceAlerts)
      .map((deal) => deal.dealTitle);
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
                    <div>{deal[0].external}</div>
                    <div>
                      <NotifyButton
                        gameData={deal[0]}
                        initialState={
                          alertedDeals.includes(deal[0].external) ? true : false
                        }
                      />
                      <Button
                        className="more-info-btn"
                        variant="secondary"
                        onClick={() => {
                          setModalShow(true);
                          setClickedDealInfo(deal);
                        }}
                      >
                        More Info
                      </Button>
                    </div>
                  </Container>
                </Card>
              </>
            ))}
        </Container>
        {clickedDealInfo && (
          <MoreInfo
            show={modalShow}
            onHide={() => setModalShow(false)}
            deal={clickedDealInfo}
          />
        )}
      </>
    );
  }
};
export default Account;
