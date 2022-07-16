import express from 'express';

import { postSaveDeal } from '../controllers/deals.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/save-deal', verifyToken, postSaveDeal);

export default router;
