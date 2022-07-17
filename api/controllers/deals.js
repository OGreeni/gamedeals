import mongoose from 'mongoose';

import User from '../models/user.js';

export const postSaveDeal = (req, res, next) => {
  const dealId = req.query.dealId;
  const userId = req.query.userId;
  console.log(dealId);
  User.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(userId) },
    { $push: { savedDeals: { dealId } } }
  )
    .then((result) =>
      res.status(200).json({ message: 'Deal saved successfully!' })
    )
    .catch((err) => {
      const error = new Error('saving deal failed');
      error.statusCode = 500;
      return next(error);
    });
};

export const deleteDropDeal = (req, res, next) => {
  const dealId = req.query.dealId;
  const userId = req.query.userId;
  console.log(dealId);
  User.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(userId) },
    { $pull: { savedDeals: { dealId } } }
  )
    .then((result) => res.status(200).json({ result }))
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      next(error);
    });
};

export const getSavedDeals = (req, res, next) => {};
