import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  likeProfile,
  superLikeProfile,
  getMatches,
} from '../controllers/matchController.js';

const router = express.Router();

router.post('/like/:id', protect, likeProfile);
router.post('/superlike/:id', protect, superLikeProfile);
router.get('/matches', protect, getMatches);

export default router;