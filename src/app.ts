import express from 'express';
import { applySecurityMiddleware } from './middlewares/security.js';
import { globalLimiter } from './middlewares/rateLimiter.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import api from './routes/index.js';

export function createApp() {
  const app = express();

  applySecurityMiddleware(app);
  app.use(globalLimiter);
  app.use(express.json({ limit: '1mb' }));

  app.use('/api', api);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
