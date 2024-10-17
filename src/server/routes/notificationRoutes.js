import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification
} from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', protect, getUserNotifications);
router.put('/:id', protect, markNotificationAsRead);
router.delete('/:id', protect, deleteNotification);

export default router;