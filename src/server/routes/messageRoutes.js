import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  sendMessage,
  getMessagesForMatch,
  getUserConversations
} from '../controllers/messageController.js';

const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/conversations', protect, getUserConversations);
router.get('/:matchId', protect, getMessagesForMatch);

export default router;