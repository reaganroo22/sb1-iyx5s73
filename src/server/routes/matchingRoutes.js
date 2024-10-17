import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getPotentialMatches,
  likeUser,
  superLikeUser,
  getUserMatches,
  getUserLikes
} from '../controllers/matchingController.js';

const router = express.Router();

router.get('/potential-matches', protect, getPotentialMatches);
router.post('/like/:id', protect, likeUser);
router.post('/superlike/:id', protect, superLikeUser);
router.get('/matches', protect, getUserMatches);
router.get('/likes', protect, getUserLikes);

export default router;