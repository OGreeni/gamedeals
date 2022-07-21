import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spinner, Row } from 'react-bootstrap';

import DealCard from '../DealCard';

const FetchDeals = () => {
  const [dealsArray, setDealsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedDealsArray, setSavedDealsArray] = useState([]);
  const formUserInput = useSelector((state) => state.deals.userInput);
  const userId = useSelector((state) => state.auth.userId);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      // validate input not empty
      if (formUserInput && formUserInput.trim()) {
        const res1 = await fetch(
          `https://www.cheapshark.com/api/1.0/games?title=${formUserInput}&limit=60&exact=0`
        );
        setDealsArray(await res1.json());
      }

      if (isLoggedIn) {
        console.log(userId);
        const res2 = await fetch(`/deals/get-saved-deals?userId=${userId}`);
        const result = await res2.json();
        setSavedDealsArray(result.savedDeals);
        console.log(savedDealsArray);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [formUserInput]);

  if (isLoading) {
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" />
      </Row>
    );
  }
  return dealsArray.map((deal) => (
    <DealCard
      savedDealsArray={savedDealsArray}
      cheapsetDealId={deal.cheapestDealID}
      cheapest={deal.cheapest}
      external={deal.external}
      thumb={deal.thumb}
      key={deal.gameID}
    />
  ));
};

export default FetchDeals;
