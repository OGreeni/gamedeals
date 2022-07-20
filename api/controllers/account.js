import User from '../models/user.js';
import fetch from 'node-fetch';

export const getUserProfile = async (req, res, next) => {
  const dealsArray = [];
  const userId = req.params.userId;
  try {
    const user = await User.findOne({ _id: userId });
    const savedDealsArray = user.savedDeals;
    for (const deal of savedDealsArray) {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?id=${encodeURIComponent(
          deal.dealId
        )}`
      );
      if (response.ok) {
        const result = await response.json();
        dealsArray.push(result);
      }
    }
    console.log(user);
    console.log(dealsArray);
    res.status(200).json({ user, dealsArray });
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
};
