import { Router } from 'express';
const router = Router();
import {
  getGroupsWithUserId,
  getPopulatedGroupWithGroupId,
  createGroup
} from '../controllers/groupController.js';
import { groupPopulateMiddleware } from '../middleware/groupPopulateMiddleware.js';

router.get('/user/:id', getGroupsWithUserId);
router.get('/group/:id', groupPopulateMiddleware, getPopulatedGroupWithGroupId);
router.post('/new', createGroup);

export default router;
