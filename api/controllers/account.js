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
    response = await fetch(
      `https://www.cheapshark.com/api/1.0/games?title=${deal.dealTitle}&&limit=1`
    );
    const result = await response.json();
    dealsArray.push(result);
  }
  console.log(dealsArray);
  res.status(200).json({ user, dealsArray });
};

// PRICE ALERTS -- CHEAKSHARK API
// BUILD "GET NOTIFIED" MODAL -- USERS SET PRICE TO GET NOTIFIED OF DROPS
// PROJECT DIRECTORY STRUCTURE
