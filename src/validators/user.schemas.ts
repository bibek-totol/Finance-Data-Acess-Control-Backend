import { z } from 'zod';
import { ROLES } from '../constants/roles.js';

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  role: z.enum([ROLES.VIEWER, ROLES.ANALYST, ROLES.ADMIN]).optional(),
});

export const updateUserSchema = z.object({
  role: z.enum([ROLES.VIEWER, ROLES.ANALYST, ROLES.ADMIN]).optional(),
  isActive: z.boolean().optional(),
});
