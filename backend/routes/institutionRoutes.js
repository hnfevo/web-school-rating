import express from 'express';
import {
    getAllInstitutions,
    getInstitution,
    createInstitution,
    updateInstitution,
    deleteInstitution
} from '../controllers/institutionController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllInstitutions);
router.get('/:id', getInstitution);

// Protected routes (admin only)
router.post('/', authMiddleware, createInstitution);
router.put('/:id', authMiddleware, updateInstitution);
router.delete('/:id', authMiddleware, deleteInstitution);

export default router;
