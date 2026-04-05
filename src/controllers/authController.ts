import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User.js';
import { signAccessToken } from '../utils/jwt.js';
import { ApiError } from '../utils/ApiError.js';

export const authController = {
  /**
   * Login user: verify credentials, return { accessToken, user }
   */
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      // Find user and include password hash
      const user = await UserModel.findOne({ email }).select('+passwordHash');
      if (!user) {
        throw ApiError.unauthorized('Invalid email or password');
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        throw ApiError.unauthorized('Invalid email or password');
      }

      // Check if user is active
      if (!user.isActive) {
        throw ApiError.forbidden('Your account is inactive. Please contact administrator.');
      }

      // Generate access token
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

      
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw ApiError.conflict('An account with this email already exists');
      }

     
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      
      const user = await UserModel.create({
        email,
        passwordHash,
        role: role || undefined, 
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
