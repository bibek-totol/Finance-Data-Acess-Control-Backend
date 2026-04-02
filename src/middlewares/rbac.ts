import type { NextFunction, Request, Response } from 'express';
import { type Role, ROLES } from '../constants/roles.js';
import { ApiError } from '../utils/ApiError.js';


export function requireRoles(...allowed: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(ApiError.unauthorized());
      return;
    }
    if (!allowed.includes(req.user.role)) {
      next(ApiError.forbidden('Insufficient role for this operation'));
      return;
    }
    next();
  };
}

export const policies = {
  adminOnly: requireRoles(ROLES.ADMIN),
  analystAndAbove: requireRoles(ROLES.ANALYST, ROLES.ADMIN),
  viewerAndAbove: requireRoles(ROLES.VIEWER, ROLES.ANALYST, ROLES.ADMIN),
} as const;
