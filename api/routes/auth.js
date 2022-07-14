import express from 'express';

import { body } from 'express-validator';

import { postSignup, postLogin } from '../controllers/auth.js';
import User from '../models/user.js';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid email address')
      .custom((val) =>
        User.findOne({ email: val }).then((res) => {
          if (res) {
            return Promise.reject('Email already in use');
          }
          return true;
        })
      ),
    body('username')
      .isAlphanumeric()
      .withMessage('Username must contain only letters and numbers')
      .isLength({ min: 5 })
      .withMessage('Username must contain at least 5 characters')
      .custom((val) =>
        User.findOne({ username: val }).then((res) => {
          if (res) {
            return Promise.reject('Username already in use');
          }
          return true;
        })
      ),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must contain at least 5 characters'),
  ],
  postSignup
);

router.post('/login', postLogin);

export default router;
