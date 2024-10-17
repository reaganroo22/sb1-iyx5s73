import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  updateSubscription,
  getUserSubscription
} from '../controllers/subscriptionController.js';

const router = express.Router();

router.put('/', protect, updateSubscription);
router.get('/', protect, getUserSubscription);

export default router;