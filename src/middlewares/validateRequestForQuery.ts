import type { NextFunction, Request, Response } from 'express';
import type { ZodTypeAny } from 'zod';
import { ApiError } from '../utils/ApiError.js';

export function validateRequestForQuery(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      next(ApiError.badRequest('Query validation failed', result.error.flatten()));
      return;
    }

    req.query = result.data;
    next();
  };
}
