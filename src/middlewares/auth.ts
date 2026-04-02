import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError.js';
import { verifyAccessToken } from '../utils/jwt.js';

const BEARER = 'Bearer ';

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith(BEARER)) {
    return next(ApiError.unauthorized('Missing or invalid Authorization header'));
  }
  const token = header.slice(BEARER.length).trim();
  if (!token) {
    return next(ApiError.unauthorized('Missing token'));
  }
  try {
    const payload = verifyAccessToken(token);
    if (!payload.isActive) {
      return next(ApiError.forbidden('Account is inactive'));
    }
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      isActive: payload.isActive,
    };
    next();
  } catch {
    next(ApiError.unauthorized('Invalid or expired token'));
  }
}
