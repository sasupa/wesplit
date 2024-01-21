import { Router } from 'express';
const router = Router();
import { getCurrentUser } from '../controllers/userController.js';

router.get('/get-current-user', getCurrentUser);

export default router;
