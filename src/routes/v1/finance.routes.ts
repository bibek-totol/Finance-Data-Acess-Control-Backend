import { Router } from 'express';
import { financeController } from '../../controllers/financeController.js';
import { authenticate } from '../../middlewares/auth.js';
import { policies } from '../../middlewares/rbac.js';

const router = Router();

/**
 * RBAC sketch (implement in controllers + refine policies):
 * - GET list/summary: viewer+ or analyst+ depending on product rules
 * - POST/PUT/DELETE: admin only (typical for assignment)
 */
router.get('/records', authenticate, policies.viewerAndAbove, financeController.list);
router.post('/records', authenticate, policies.adminOnly, financeController.create);
router.get('/dashboard/summary', authenticate, policies.analystAndAbove, financeController.dashboardSummary);

export default router;
