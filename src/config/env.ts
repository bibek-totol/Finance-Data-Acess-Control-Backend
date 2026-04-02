import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT) || 4000,
  mongoUri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/finance_access',
  jwtSecret: process.env.JWT_SECRET ?? 'change-me-dev-only',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
  
} as const;

export const isDev = env.nodeEnv === 'development';
