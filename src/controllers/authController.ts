import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Placeholder — implement: validate body, hash password, create user, issue JWT.
 * Protect registration: only admin should create users with elevated roles (assignment rule).
 */
export const authController = {
  login: (_req: Request, res: Response) => {
    res.status(StatusCodes.NOT_IMPLEMENTED).json({
      message: 'Implement login: verify credentials, return { accessToken }',
    });
  },

  register: (_req: Request, res: Response) => {
    res.status(StatusCodes.NOT_IMPLEMENTED).json({
      message: 'Implement registration or admin-driven user provisioning',
    });
  },
};
