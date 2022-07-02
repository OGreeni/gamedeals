import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import DealCard from '../DealCard';

const FetchDeals = () => {
  const [dealsArray, setDealsArray] = useState([]);
  const formUserInput = useSelector((state) => state.userInput);
  useEffect(() => {
    // has to return a cleanup func (not promise)
    const fetchData = async () => {
      // validate input not empty
      if (formUserInput && formUserInput.trim()) {
        const response = await fetch(
          `https://www.cheapshark.com/api/1.0/games?title=${formUserInput}&limit=60&exact=0`
        );
        setDealsArray(await response.json());
      }
    };
    fetchData();
  }, [formUserInput]);
  return dealsArray.map((deal) => (
    <DealCard dealData={deal} key={deal.gameID} /> // gameID --> unique key
  ));
};

export default FetchDeals;
