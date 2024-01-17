import { Router } from 'express';
const router = Router();
import {
  getTested,
  getTransactions,
  createTransaction,
  createUser,
  getUser,
} from '../controllers/testController.js';
import { populateActivityMiddleware } from '../middleware/testPopulateMiddleware.js';

router.get('/getting', getTested);
router.get('/getTransactions', getTransactions);
router.post('/createTransaction', createTransaction);
router.post('/createUser', createUser);
router.get('/getUser', populateActivityMiddleware, getUser);

export default router;
