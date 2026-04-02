import type { Express } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env, isDev } from '../config/env.js';

export function applySecurityMiddleware(app: Express): void {
  app.use(helmet());
  app.use(compression());
  app.use(
    cors({
      origin: env.corsOrigin === '*' ? true : env.corsOrigin.split(',').map((o) => o.trim()),
      credentials: true,
    })
  );
  if (isDev) {
    app.use(morgan('dev'));
  }
}
