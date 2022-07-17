import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spinner, Row, Container } from 'react-bootstrap';

import './AccountContent.css';

// https://www.cheapshark.com/api/1.0/deals?id=SOME_ID
// use this endpoint to later fetch deal by ID

const AccountContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const userId = useSelector((state) => state.auth.userId);
  useEffect(() => {
    setIsLoading(true);
    const fetchUserProfile = async () => {
      const response = await fetch(`/account/${userId}`);
      const result = await response.json();
      setUserInfo(result);
      setTimeout(() => setIsLoading(false), 300);
    };
    fetchUserProfile();
  }, [userId]);

  console.log(userInfo.username);

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
      </Container>
    </>
  );
};

export default AccountContent;
