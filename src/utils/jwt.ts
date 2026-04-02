import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ROLES, type Role } from '../constants/roles.js';
import { ApiError } from './ApiError.js';

export type JwtPayload = {
  sub: string;
  email: string;
  role: Role;
  isActive: boolean;
};

export function signAccessToken(payload: JwtPayload): string {
  const options = {
    expiresIn: env.jwtExpiresIn,
    issuer: 'finance-access-api-dont-manipulate-boss',
  } as SignOptions;
  return jwt.sign(payload, env.jwtSecret, options);
}

export function verifyAccessToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, env.jwtSecret, {
    issuer: 'finance-access-api-dont-manipulate-boss',
  });
  if (typeof decoded === 'string' || !decoded || typeof decoded !== 'object') {
    throw new Error('Invalid token payload');
  }

  const { sub, email, role, isActive } = decoded as Record<string, unknown>;
  if (typeof sub !== 'string' || typeof email !== 'string' || typeof role !== 'string' || typeof isActive !== 'boolean'){
    throw ApiError.unauthorized('Invalid token payload');
  } 

  if (!Object.values(ROLES).includes(role as Role)) {
    throw ApiError.unauthorized('Invalid token role');
  }

  return { sub, email, role: role as Role, isActive };
}
