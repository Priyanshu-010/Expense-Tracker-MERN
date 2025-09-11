import express from 'express';
import auth from '../middleware/authMiddleware.js';
import { createTransactions, deleteTransactions, getAllTransactions } from '../controllers/transactions.controller.js';


const router = express.Router();

// Get all transactions for user
router.get('/', auth, getAllTransactions);

// Add transaction
router.post('/', auth, createTransactions);

// Update transaction
router.put('/:id', auth, );

// Delete transaction
router.delete('/:id', auth, deleteTransactions);

export default router;