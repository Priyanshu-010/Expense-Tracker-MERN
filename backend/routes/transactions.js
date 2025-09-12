import express from 'express';
import auth from '../middleware/authMiddleware.js';
import { createTransactions, deleteTransactions, getAllTransactions, getTransactionById, updateTransaction } from '../controllers/transactions.controller.js';


const router = express.Router();

// Get all transactions for user
router.get('/', auth, getAllTransactions);

// Get a single transaction by ID
router.get('/:id', auth, getTransactionById);

// Add transaction
router.post('/', auth, createTransactions);

// Update transaction
router.put('/:id', auth, updateTransaction);

// Delete transaction
router.delete('/:id', auth, deleteTransactions);

export default router;