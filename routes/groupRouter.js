import { Router } from 'express';
const router = Router();
import {
  getGroupsWithUserId,
  createGroup
} from '../controllers/groupController.js';

router.get('/:id', getGroupsWithUserId);
router.post('/new', createGroup);

export default router;
