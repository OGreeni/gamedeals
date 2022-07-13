import express from 'express';
import mongoose from 'mongoose';

import authRouter from './routes/auth.js';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/auth', authRouter);

mongoose
  .connect(
    'mongodb+srv://omrigreen:Ffick5ol@cluster0.khsfjbr.mongodb.net/gamedeals?retryWrites=true&w=majority'
  )
  .then(app.listen(8080));
