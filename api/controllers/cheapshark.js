exports.postDeals = (req, res, next) => {
  const fetchData = async () => {
    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/games?title=${PLACEHOLDER}&limit=60&exact=0`
    );
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(response);
  };
  fetchData();
};
