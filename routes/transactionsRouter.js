import { Router } from 'express';
const router = Router();
import {
  getTransactions,
  createTransaction,
} from '../controllers/transactionController.js';
import { transactionsPopulateMiddleware } from '../middleware/transactionsPopulateMiddleware.js';
import { validateTransactionInput } from '../middleware/validationMiddleware.js';

router
  .route('/')
  .get(transactionsPopulateMiddleware, getTransactions)
  .post(validateTransactionInput, createTransaction);
//.post(validateTransactionInput, createTransaction);

export default router;
