import express from 'express';

import {
  postSaveDeal,
  deleteDropDeal,
  getSavedDeals,
} from '../controllers/deals.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/save-deal', postSaveDeal);
router.delete('/remove-deal', deleteDropDeal);
router.get('/get-saved-deals', getSavedDeals);

export default router;
