import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User.js';
import { signAccessToken } from '../utils/jwt.js';
import { ApiError } from '../utils/ApiError.js';
import { ROLES, type Role } from '../constants/roles.js';
import { FIXED_ADMIN_EMAILS } from '../constants/adminEmails.js';

export const authController = {
 
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      
      const user = await UserModel.findOne({ email }).select('+passwordHash');
      if (!user) {
        throw ApiError.unauthorized('Invalid email or password');
      }

      
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        throw ApiError.unauthorized('Invalid email or password');
      }

      
      if (!user.isActive) {
        throw ApiError.forbidden('Your account is inactive. Please contact administrator.');
      }

      
      const accessToken = signAccessToken({
        sub: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      });

      res.status(StatusCodes.OK).json({
        message: 'Login successful',
        data: {
          accessToken,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },

  
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, role } = req.body;

      // Check if email already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw ApiError.conflict('An account with this email already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // Determine final role
      let finalRole: Role = ROLES.VIEWER;

      // Only allow FIXED_ADMIN_EMAILS to become admin during registration
      if (role === ROLES.ADMIN && FIXED_ADMIN_EMAILS.includes(email.toLowerCase())) {
        finalRole = ROLES.ADMIN;
      }

      const user = await UserModel.create({
        email: email.toLowerCase(),
        passwordHash,
        role: finalRole,
      });

      
      const accessToken = signAccessToken({
        sub: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      });

      res.status(StatusCodes.CREATED).json({
        message: 'Registration successful',
        data: {
          accessToken,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
