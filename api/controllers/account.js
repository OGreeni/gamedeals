import User from '../models/user.js';
import fetch from 'node-fetch';
import mongoose from 'mongoose';

export const getUserProfile = async (req, res, next) => {
  const dealsArray = [];
  const userId = req.params.userId;
  const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
  const savedDealsArray = user.savedDeals;

  for (const deal of savedDealsArray) {
    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/deals?id=${encodeURIComponent(
        deal.dealId
      )}`
    );

    const result = await response.json();
    if (!Array.isArray(result)) {
      dealsArray.push(result);
      console.log(result);
    }
  }

  res.status(200).json({ user, dealsArray });
};
