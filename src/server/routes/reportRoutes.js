import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createReport,
  getReports,
  updateReportStatus
} from '../controllers/reportController.js';

const router = express.Router();

router.post('/', protect, createReport);
router.get('/', protect, getReports); // Add admin middleware
router.put('/:id', protect, updateReportStatus); // Add admin middleware

export default router;