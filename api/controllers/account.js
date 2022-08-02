import User from '../models/user.js';
import fetch from 'node-fetch';
import mongoose from 'mongoose';

export const getUserProfile = async (req, res, next) => {
  const dealsArray = [];
  const userId = req.params.userId;
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
  const savedDealsArray = user.savedDeals;

  let response;

  for (const deal of savedDealsArray) {
    if (deal.dealId.length > decodeURIComponent(deal.dealId).length) {
      response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?id=${deal}`
      );
    } else {
      response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?id=${encodeURIComponent(
          deal.dealId
        )}`
      );
    }

    const result = await response.json();
    if (!Array.isArray(result)) {
      dealsArray.push(result);
    }
  }

  res.status(200).json({ user, dealsArray });
};
