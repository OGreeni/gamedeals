import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spinner, Row, Container } from 'react-bootstrap';

import './AccountContent.css';

// https://www.cheapshark.com/api/1.0/deals?id=SOME_ID
// use this endpoint to later fetch deal by ID

// const encoded = encodeURIComponent(
//   '+yx+apfK+6YN/rb9gh+Xlf1fJet1r8S1NN6nn41FJH0='
// );

const AccountContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [savedDealsArray, setSavedDealsArray] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    setIsLoading(true);
    const fetchUserProfile = async () => {
      if (!userInfo) {
        const response = await fetch(`/account/${userId}`);
        const result = await response.json();
        setUserInfo(result);
      } else {
        for (const i in userInfo.deals) {
          const response = await fetch(
            `https://www.cheapshark.com/api/1.0/deals?id=${encodeURIComponent(
              userInfo.deals[i].dealId
            )}`
          );
          const res = await response.json();
          setSavedDealsArray((prevState) => [...prevState, res]);
          savedDealsArray.push(res);
        }
        setTimeout(() => setIsLoading(false), 100);
      }
    };
    fetchUserProfile();
  }, [userId, userInfo]);

  console.log(savedDealsArray);

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
  return (
    <>
      <br />
      <Container className="text-center">
        <h1 className="account-title">
          <span className="account-username">{`${userInfo.username}'s `}</span>
          Account Page
        </h1>
        <br />
        <h2 className="account-favorites">Saved games:</h2>
        {savedDealsArray &&
          savedDealsArray.map((deal) => <h3>{deal.gameInfo.name}</h3>)}
      </Container>
    </>
  );
};

export default AccountContent;
