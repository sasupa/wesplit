import { Router } from 'express';
const router = Router();
import {
  getTested,
  getTransactions,
  createTransaction,
  createUser,
} from '../controllers/testController.js';

router.get('/getting', getTested);
router.get('/getTransactions', getTransactions);
router.post('/createTransaction', createTransaction);
router.post('/createUser', createUser);

export default router;
