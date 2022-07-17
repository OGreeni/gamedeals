import User from '../models/user.js';

export const getUserProfile = (req, res, next) => {
  const userId = req.params.userId;
  User.findOne({ _id: userId })
    .then((user) =>
      res.status(200).json({
        email: user.email,
        username: user.username,
        deals: user.savedDeals,
      })
    )
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};
