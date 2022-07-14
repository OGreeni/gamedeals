import { validationResult } from 'express-validator';

import User from '../models/user.js';

export const postSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 422;
    return next(error);
  }
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const user = new User({
    email,
    username,
    password,
  });
  user
    .save()
    .then((result) => {
      res
        .status(201)
        .json({ message: 'Signed up successfully!', user: result });
    })
    .catch((err) => console.log(err));
};
