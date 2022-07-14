import express from 'express';

import { body } from 'express-validator';

import { postSignup } from '../controllers/auth.js';
import User from '../models/user.js';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    // .custom((value, { req }) => {
    //   if (User.findOne({ email: value })) {
    //     throw new Error('Email already registered');
    //   }
    //   return true;
    // }),
    body('username')
      .isAlphanumeric()
      .withMessage('Username must contain only letters and numbers')
      .isLength({ min: 5 })
      .withMessage('Username must contain at least 5 characters'),
    // .custom((value, { req }) => {
    //   if (User.findOne({ username: value })) {
    //     throw new Error('Username already taken');
    //   }
    //   return true;
    // }), // apply to frontend validation as well
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must contain at least 5 characters'), // apply to frontend validation as well
  ],
  postSignup
);

export default router;
