import express from 'express';
import {
    submitAdminRatings,
    getAdminRatings,
    submitPublicRating,
    getPublicRatings
} from '../controllers/ratingController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Admin rating routes (protected)
router.post('/admin', authMiddleware, submitAdminRatings);
router.get('/admin/:institutionId', getAdminRatings);

// Public rating routes
router.post('/public', submitPublicRating);
router.get('/public/:institutionId', getPublicRatings);

export default router;
