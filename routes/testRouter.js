import { Router } from 'express';
const router = Router();
import {
  getTested,
  getTransactions,
  createTransaction,
} from '../controllers/testController.js';

router.get('/getting', getTested);
router.get('/getTransactions', getTransactions);
router.post('/createTransaction', createTransaction);

export default router;
