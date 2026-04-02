import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

/** Placeholder handlers — implement CRUD, filters, dashboard aggregations */
export const financeController = {
  list: (_req: Request, res: Response) => {
    res.status(StatusCodes.NOT_IMPLEMENTED).json({
      message: 'Implement list with filters (date, category, type) + pagination',
    });
  },

  create: (_req: Request, res: Response) => {
    res.status(StatusCodes.NOT_IMPLEMENTED).json({
      message: 'Implement create (admin-only per your RBAC matrix)',
    });
  },

  dashboardSummary: (_req: Request, res: Response) => {
    res.status(StatusCodes.NOT_IMPLEMENTED).json({
      message: 'Implement totals, category breakdown, trends, recent activity',
    });
  },
};
