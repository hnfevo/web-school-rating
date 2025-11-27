import express from 'express';
import {
    getAllCriteria,
    createCriterion,
    updateCriterion,
    deleteCriterion
} from '../controllers/criterionController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getAllCriteria);

// Protected routes (admin only)
router.post('/', authMiddleware, createCriterion);
router.put('/:id', authMiddleware, updateCriterion);
router.delete('/:id', authMiddleware, deleteCriterion);

export default router;
