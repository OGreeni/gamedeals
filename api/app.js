import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.js';
import accountRouter from './routes/account.js';
import dealsRouter from './routes/deals.js';

const app = express();

const upload = multer();

dotenv.config();

const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', upload.none(), authRouter);
app.use('/account', accountRouter);
app.use('/deals', dealsRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});

mongoose
  .connect(mongo_uri)
  .then(app.listen(port, () => console.log(`Server running on port ${port}`)));
