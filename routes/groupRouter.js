import { Router } from 'express';
const router = Router();
import {
  getGroupsWithUserId,
  getPopulatedGroupWithGroupId,
  createGroup
} from '../controllers/groupController.js';
import { groupPopulateMiddleware } from '../middleware/groupPopulateMiddleware.js';
import { groupsPopulateMiddleware } from '../middleware/groupsPopulateMiddleware.js';

router.get('/user/:id', groupsPopulateMiddleware, getGroupsWithUserId);
router.get('/group/:id', groupPopulateMiddleware, getPopulatedGroupWithGroupId);
router.post('/new', createGroup);

export default router;
