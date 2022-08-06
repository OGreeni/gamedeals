import express from 'express';

import { verifyToken } from '../middleware/auth.js';
import { getUserProfile } from '../controllers/account.js';

const router = express.Router();

router.get('/:userId', verifyToken, getUserProfile);

export default router;
