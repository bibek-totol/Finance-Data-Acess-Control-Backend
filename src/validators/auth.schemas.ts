import { z } from 'zod';
import { ROLES } from '../constants/roles.js';


export const registerBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  role: z.enum([ROLES.VIEWER, ROLES.ANALYST, ROLES.ADMIN]).optional(),
});

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
