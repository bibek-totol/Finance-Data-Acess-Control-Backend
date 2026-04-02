import type { Role } from '../constants/roles.js';

declare global {
  namespace Express {
    interface Request {
     
      user?: {
        id: string;
        email: string;
        role: Role;
        isActive: boolean;
      };
    }
  }
}

export {};
