import mongoose from 'mongoose';

import User from '../models/user.js';

export const postSaveDeal = (req, res, next) => {
  const dealId = req.body.dealId;
  const userId = req.body.userId;
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
