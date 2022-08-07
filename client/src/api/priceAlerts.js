export const updatePriceAlerts = async ({
  userId,
  gameTitle,
  gameId,
  currentPrice,
}) => {
  const response = await fetch(
    `/deals/update-price-alerts?userId=${userId}&gameTitle=${gameTitle}&gameId=${gameId}&currentPrice=${currentPrice}`,
    { method: 'POST' }
  );
  return response.ok;
};
