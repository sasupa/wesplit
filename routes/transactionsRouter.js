import { Router } from 'express';
const router = Router();
import {
  getTransactions,
  createTransaction,
} from '../controllers/transactionController.js';

router.route('/').get(getTransactions).post(createTransaction);

//router.get('/', getTransactions);
// router.get('/getTransactions', getTransactions);
// router.post('/createTransaction', createTransaction);
// router.post('/createUser', createUser);
// router.get('/getUser', populateActivityMiddleware, getUser);

export default router;
