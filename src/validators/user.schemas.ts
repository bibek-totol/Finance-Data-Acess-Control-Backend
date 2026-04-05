import { z } from 'zod';
import { ROLES } from '../constants/roles.js';

export const updateUserSchema = z.object({
  role: z.enum([ROLES.VIEWER, ROLES.ANALYST, ROLES.ADMIN]).optional(),
  isActive: z.boolean().optional(),
});
