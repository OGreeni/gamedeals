import express from 'express';

import { body } from 'express-validator';

import { postSignup } from '../controllers/auth.js';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('username')
      .isAlphanumeric()
      .withMessage('Username must contain only letters and numbers')
      .isLength({ min: 5 })
      .withMessage('Username must contain at least 5 characters'), // apply to frontend validation as well
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must contain at least 5 characters'), // apply to frontend validation as well
  ],
  postSignup
);

export default router;
