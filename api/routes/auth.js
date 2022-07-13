import express from 'express';

import { postSignup } from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', postSignup); // add controller func

export default router;
