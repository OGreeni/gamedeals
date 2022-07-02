import React from 'react';

const DealCard = ({ dealData }) => {
  return (
    <article>
      <div>{dealData.external}</div>
      <div>${dealData.cheapest}</div>
    </article>
  );
};

export default DealCard;
