import express from 'express';

import {
  postSaveDeal,
  deleteDropDeal,
  getSavedDeals,
  postUpdatePriceAlerts,
} from '../controllers/deals.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/save-deal', verifyToken, postSaveDeal);
router.delete('/remove-deal', verifyToken, deleteDropDeal);
router.get('/get-saved-deals', verifyToken, getSavedDeals);
router.post('/update-price-alerts', verifyToken, postUpdatePriceAlerts);

export default router;
