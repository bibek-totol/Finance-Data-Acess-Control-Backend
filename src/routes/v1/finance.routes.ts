import { Router } from 'express';
import { financeController } from '../../controllers/financeController.js';
import { authenticate } from '../../middlewares/auth.js';
import { policies } from '../../middlewares/rbac.js';
import { validateRequestForBody } from '../../middlewares/validateRequestForBody.js';
import { validateRequestForQuery } from '../../middlewares/validateRequestForQuery.js';
import { 
  createFinancialRecordSchema, 
  updateFinancialRecordSchema, 
  queryFinancialRecordSchema 
} from '../../validators/finance.schemas.js';

const router = Router();


router.get(
  '/records', 
  authenticate, 
  policies.analystAndAbove, 
  validateRequestForQuery(queryFinancialRecordSchema),
  financeController.list
);

router.post(
  '/records', 
  authenticate, 
  policies.adminOnly, 
  validateRequestForBody(createFinancialRecordSchema),
  financeController.create
);

router.put(
  '/records/:id', 
  authenticate, 
  policies.adminOnly, 
  validateRequestForBody(updateFinancialRecordSchema),
  financeController.update
);

router.delete(
  '/records/:id', 
  authenticate, 
  policies.adminOnly, 
  financeController.delete
);


router.get(
  '/dashboard/summary', 
  authenticate, 
  policies.viewerAndAbove, 
  financeController.dashboardSummary
);

export default router;
