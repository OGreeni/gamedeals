import mongoose from 'mongoose';
import fetch from 'node-fetch';

import User from '../models/user.js';

export const postSaveDeal = (req, res, next) => {
  const dealTitle = req.query.dealTitle;
  console.log(dealTitle);
  const userId = req.query.userId;
  User.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(userId) },
    { $push: { savedDeals: { dealTitle, priceAlerts: false } } }
  )
    .then((result) => {
      res.status(200).end();
    })
    .catch((err) => {
      const error = new Error('saving deal failed');
      error.statusCode = 500;
      return next(error);
    });
};

export const deleteDropDeal = (req, res, next) => {
  const dealTitle = req.query.dealTitle;
  const userId = req.query.userId;
  User.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(userId) },
    { $pull: { savedDeals: { dealTitle } } }
  )
    .then((result) => res.status(200).json({ result }))
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};

export const getSavedDeals = (req, res, next) => {
  const userId = req.query.userId;
  User.findOne({ _id: mongoose.Types.ObjectId(userId) })
    .then((user) => {
      res.status(200).json({ savedDeals: user.savedDeals });
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};

export const postUpdatePriceAlerts = async (req, res, next) => {
  const userId = req.query.userId;
  const gameTitle = req.query.gameTitle;
  const gameId = req.query.gameId;

  const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
  const email = user.email;

  let gameObjIndex;
  const gameObj = user.savedDeals.filter((deal, idx) => {
    if (deal.dealTitle === gameTitle) {
      gameObjIndex = idx;
      return true;
    }
  });

  const alertStatus = gameObj[0].priceAlerts;
  if (!alertStatus) {
    // set price alerts
    const currentPrice = req.query.currentPrice;
    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/alerts?action=set&email=${email}&gameID=${gameId}&price=${currentPrice}`
    );
    console.log('Adding alert status:', await response.json());
    // change alert status to true
    user.savedDeals[gameObjIndex].priceAlerts = true;
    await user.save();

    // TODO: SEND SUBSCRIPTION NOTIFICATION EMAIL

    res.status(200).end();
  } else {
    // remove price alerts
    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/alerts?action=delete&email=${email}&gameID=${gameId}`
    );
    // change alert status to false
    user.savedDeals[gameObjIndex].priceAlerts = false;
    console.log('Removing alerts status:', await response.json());
    await user.save();
    res.status(200).end();
  }
};
