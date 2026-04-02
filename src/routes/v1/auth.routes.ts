import { Router } from 'express';
import { authController } from '../../controllers/authController.js';
import { authLimiter } from '../../middlewares/rateLimiter.js';
import { validateRequestForBody } from '../../middlewares/validateRequestForBody.js';
import { loginBodySchema, registerBodySchema } from '../../validators/auth.schemas.js';

const router = Router();

router.post('/login', authLimiter, validateRequestForBody(loginBodySchema), authController.login);
router.post('/register', authLimiter, validateRequestForBody(registerBodySchema), authController.register);

export default router;
