import { z } from 'zod';

export const createFinancialRecordSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1).max(50),
  date: z.string().transform((str) => new Date(str)),
  notes: z.string().max(250).optional(),
});

export const updateFinancialRecordSchema = z.object({
  amount: z.number().positive().optional(),
  type: z.enum(['income', 'expense']).optional(),
  category: z.string().min(1).max(50).optional(),
  date: z.string().transform((str) => new Date(str)).optional(),
  notes: z.string().max(250).optional(),
});

export const queryFinancialRecordSchema = z.object({
  startDate: z.string().optional().transform((str) => str ? new Date(str) : undefined),
  endDate: z.string().optional().transform((str) => str ? new Date(str) : undefined),
  type: z.enum(['income', 'expense']).optional(),
  category: z.string().optional(),
  page: z.string().optional().transform((str) => str ? parseInt(str, 10) : 1),
  limit: z.string().optional().transform((str) => str ? parseInt(str, 10) : 10),
});
