import { Router } from 'express';
import authRoutes from './auth.routes.js';
import financeRoutes from './finance.routes.js';
import userRoutes from './user.routes.js';
import healthRoutes from './health.routes.js';

const v1 = Router();

v1.use(healthRoutes);
v1.use('/auth', authRoutes);
v1.use('/', financeRoutes);
v1.use('/', userRoutes);

export default v1;
