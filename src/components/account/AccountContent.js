import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spinner, Row, Container } from 'react-bootstrap';

import './AccountContent.css';

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
      setTimeout(() => setIsLoading(false), 250);
      console.log(result);
    };
    fetchUserProfile();
  }, [userId]);

  if (isLoading) {
    return (
      <>
        <br />
        <Container>
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
