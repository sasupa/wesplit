import { Router } from 'express';
const router = Router();
import {
  getGroupsWithUserId,
  getPopulatedGroupWithGroupId,
  createGroup,
  addUserToGroup,
  removeMemberFromGroup
} from '../controllers/groupController.js';
import { groupPopulateMiddleware } from '../middleware/groupPopulateMiddleware.js';
import { groupsPopulateMiddleware } from '../middleware/groupsPopulateMiddleware.js';

router.get('/user/:id', groupsPopulateMiddleware, getGroupsWithUserId);
router.get('/group/:id', groupPopulateMiddleware, getPopulatedGroupWithGroupId);
router.post('/new', createGroup);
router.post('/add', addUserToGroup);
router.post('/remove', removeMemberFromGroup);

export default router;
