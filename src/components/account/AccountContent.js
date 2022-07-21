import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spinner, Container, Row } from 'react-bootstrap';

import './AccountContent.css';

const AccountContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null); // {}
  const [savedDeals, setSavedDeals] = useState(null); // []
  const userId = useSelector((state) => state.auth.userId);
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
  if (userData && savedDeals) {
    console.log(savedDeals);
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
        {savedDeals.length > 0 &&
          savedDeals.map((deal, i) => <h3 key={i}>{deal.gameInfo.name}</h3>)}
      </Container>
    );
  }
  // const [userData, setUserData] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const userId = useSelector((state) => state.auth.userId);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const fetchData = async () => {
  //     const response = await fetch(`/account/${userId}`);
  //     if (response.ok) {
  //       const result = await response.json();
  //       setUserData(result);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, [userId]);

  // if (isLoading) {
  //   return (
  //     <>
  //       <br />
  //       <Container className="spinner-container">
  //         <Row className="justify-content-center">
  //           <Spinner animation="border" />
  //         </Row>
  //       </Container>
  //     </>
  //   );
  // }

  // if (userData && userData.dealsArray !== []) {
  //   for (const i in userData.dealsArray) {
  //     if (!userData.dealsArray[i].length) {
  //       userData.dealsArray.pop(i);
  //     }
  //   }
  //   const dealsArray = userData.dealsArray;
  //   return (
  //     <>
  //       <br />
  //       <Container>
  //         <h1 className="account-title text-center">
  //           <span className="account-username">{`${userData.user.username}'s `}</span>
  //           's Account Page
  //         </h1>
  //         <br />
  //         <h2 className="account-favorites text-center">Saved games:</h2>
  //         <br />
  //         {dealsArray.map((deal, i) => (
  //           <h3 className="text-center" key={i}>
  //             {deal.gameInfo.name}
  //           </h3>
  //         ))}
  //       </Container>
  //     </>
  //   );
  // }
};
export default AccountContent;

// ACCOUNT -- NOT LOADING SAVED GAMES
// INDEX -- DOESN'T SHOW IF GAME WAS ALREADY SAVED
