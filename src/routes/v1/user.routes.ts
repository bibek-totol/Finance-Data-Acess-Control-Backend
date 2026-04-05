import { Router } from 'express';
import { userController } from '../../controllers/userController.js';
import { authenticate } from '../../middlewares/auth.js';
import { policies } from '../../middlewares/rbac.js';
import { validateRequestForBody } from '../../middlewares/validateRequestForBody.js';
import { updateUserSchema } from '../../validators/user.schemas.js';

const router = Router();

// Only admin can list, update, or delete users
router.get('/users', authenticate, policies.adminOnly, userController.list);
router.put('/users/:id', authenticate, policies.adminOnly, validateRequestForBody(updateUserSchema), userController.update);
router.delete('/users/:id', authenticate, policies.adminOnly, userController.delete);

export default router;
