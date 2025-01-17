import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;