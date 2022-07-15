import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spinner, Row } from 'react-bootstrap';

import DealCard from '../index/DealCard';

const FetchDeals = () => {
  const [dealsArray, setDealsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const formUserInput = useSelector((state) => state.userInput);
  useEffect(() => {
    setIsLoading(true);
    // has to return a cleanup func (not promise)
    const fetchData = async () => {
      // validate input not empty
      if (formUserInput && formUserInput.trim()) {
        const response = await fetch(
          `https://www.cheapshark.com/api/1.0/games?title=${formUserInput}&limit=60&exact=0`
        );
        setDealsArray(await response.json());
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
    <DealCard dealData={deal} key={deal.gameID} />
  ));
};

export default FetchDeals;
