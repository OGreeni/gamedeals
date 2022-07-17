import express from 'express';

import { postSaveDeal, deleteDropDeal } from '../controllers/deals.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/save-deal', verifyToken, postSaveDeal);
router.delete('/remove-deal', verifyToken, deleteDropDeal);

export default router;
