import express from 'express';

import {
  postSaveDeal,
  deleteDropDeal,
  getSavedDeals,
} from '../controllers/deals.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/save-deal', verifyToken, postSaveDeal);
router.delete('/remove-deal', verifyToken, deleteDropDeal);
router.get('/get-saved-deals', verifyToken, getSavedDeals);

export default router;
