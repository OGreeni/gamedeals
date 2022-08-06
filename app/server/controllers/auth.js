import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'gamedeals2022@outlook.com',
    pass: 'Ffick5ol',
  },
});

import { validationResult } from 'express-validator';

import User from '../models/user.js';

export const postRegister = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 422;
    return next(error);
  }
  const { email, username, password } = req.body;

  if (!(email && username && password)) {
    const error = new Error('All fields required to continue');
    error.statusCode = 400;
    return next(error);
  }

  // encrypt password
  bcrypt.hash(password, 10).then((encryptedPassword) => {
    const user = new User({
      email: email.toLowerCase(),
      username,
      password: encryptedPassword,
    });
    user
      .save()
      .then((savedUser) => {
        const token = jwt.sign(
          {
            user_id: savedUser._id,
            email,
          },
          process.env.TOKEN_KEY,
          { expiresIn: '2h' }
        );
        user.token = token;
        res.cookie('JWT_TOKEN', `bearer ${token}`, { httpOnly: true });
        res
          .status(201)
          .json({ message: 'Registered successfully!', user: savedUser });
        const options = {
          from: 'gamedeals2022@outlook.com',
          to: user.email,
          subject: 'Welcome to GameDeals',
          text: `Welcome to GameDeals, ${user.username}! We're so excited to have you around.`,
        };
        transporter.sendMail(options, (err, info) => {
          if (err) {
            console.log(err);
            return;
          }
        });
      })
      .catch((err) => console.log(err));
  });
};

export const postLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    const error = new Error('All fields required to continue');
    error.statusCode = 400;
    return next(error);
  }
  let loginUser;
  User.findOne({ email: email.toLowerCase() })
    .then((user) => {
      if (!user) {
        const error = new Error(
          'Incorrect email or password. Please try again'
        );
        error.statusCode = 401;
        return next(error);
      }
      loginUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((passwordsMatch) => {
      if (passwordsMatch) {
        // create token
        const token = jwt.sign(
          {
            user_id: loginUser._id,
            email,
          },
          process.env.TOKEN_KEY,
          { expiresIn: '2h' }
        );
        loginUser.token = token;
        res.cookie('JWT_TOKEN', `bearer ${token}`, { httpOnly: true });
        res
          .status(200)
          .json({ message: 'Logged in successfully!', user: loginUser });
      } else {
        const error = new Error(
          'Incorrect email or password. Please try again'
        );
        error.statusCode = 401;
        return next(error);
      }
    });
};
