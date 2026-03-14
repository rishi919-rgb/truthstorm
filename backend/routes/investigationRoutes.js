import express from 'express';
import { createInvestigation, getMyInvestigations, deleteInvestigation } from '../controllers/investigationController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes below are protected
router.use(protect);

// POST /api/investigations - Submit new investigation
router.post('/', createInvestigation);

// GET /api/investigations - Get all user's investigations
router.get('/', getMyInvestigations);

// DELETE /api/investigations/:id - Delete an investigation
router.delete('/:id', deleteInvestigation);

export default router;
