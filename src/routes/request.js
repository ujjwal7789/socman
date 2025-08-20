import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roles.js';
import { createRequest, listAllRequests, listMyRequests, updateRequestStatus } from '../controllers/request.controller.js';


const router = Router();


// Resident
router.post('/', authenticate, authorize('resident', 'admin'), createRequest);
router.get('/mine', authenticate, authorize('resident', 'admin'), listMyRequests);


// Admin
router.get('/', authenticate, authorize('admin'), listAllRequests);
router.put('/:id', authenticate, authorize('admin'), updateRequestStatus);


export default router;