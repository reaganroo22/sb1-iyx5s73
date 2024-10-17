import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createOrUpdateProfile,
  getProfile,
  getNearbyProfiles,
  updateProfilePhotos,
  updateProfileInterests,
  getProfileById,
} from '../controllers/profileController.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrUpdateProfile)
  .get(protect, getProfile);

router.get('/nearby', protect, getNearbyProfiles);
router.put('/photos', protect, updateProfilePhotos);
router.put('/interests', protect, updateProfileInterests);
router.get('/:id', protect, getProfileById);

export default router;