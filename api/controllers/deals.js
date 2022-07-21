import mongoose from 'mongoose';

import User from '../models/user.js';

export const postSaveDeal = (req, res, next) => {
  const dealId = req.query.dealId;
  const userId = req.query.userId;
  User.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(userId) },
    { $push: { savedDeals: { dealId } } }
  )
    .then((result) => {
      res.status(200).json({ message: 'Deal saved successfully!' });
    })
    .catch((err) => {
      const error = new Error('saving deal failed');
      error.statusCode = 500;
      return next(error);
    });
};

export const deleteDropDeal = (req, res, next) => {
  const dealId = req.query.dealId;
  const userId = req.query.userId;
  User.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(userId) },
    { $pull: { savedDeals: { dealId } } }
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
