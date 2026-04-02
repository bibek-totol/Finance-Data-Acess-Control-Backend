import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(StatusCodes.NOT_FOUND).json({ error: 'Invalid route. Please check the URL and try again.' });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  const isDev = env.nodeEnv === 'development';

  if (err instanceof ApiError) {
    const body: { error: string; details?: unknown } = {
      error: err.message,
    };
    if (isDev && err.details !== undefined) body.details = err.details;

    res.status(err.statusCode).json(body);
    return;
  }

  const message = err instanceof Error ? err.message : 'Internal server error';
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: env.nodeEnv === 'development' ? message : 'Internal server error',
  });
}
