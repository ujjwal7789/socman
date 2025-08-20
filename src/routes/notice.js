import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roles.js';
import { createNotice, listNotices } from '../controllers/notice.controller.js';


const router = Router();
router.get('/', authenticate, listNotices);
router.post('/', authenticate, authorize('admin'), createNotice);
export default router;