import { Router } from 'express';
import { getOperations, createOperation } from '../controllers/AccountOperationController';

const router = Router();

// GET /api/operations/:accountNumber
router.get('/:accountNumber', getOperations);

// POST /api/operations
router.post('/', createOperation);

export default router;
