import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserModel } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

export const userController = {
  
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserModel.find().select('-passwordHash');
      res.status(StatusCodes.OK).json({ data: users });
    } catch (error) {
      next(error);
    }
  },

  
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { role, isActive } = req.body;

      const user = await UserModel.findByIdAndUpdate(
        id, 
        { role, isActive }, 
        { new: true, runValidators: true }
      ).select('-passwordHash');

      if (!user) {
        throw ApiError.notFound('User not found');
      }

      res.status(StatusCodes.OK).json({
        message: 'User updated successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },


  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findByIdAndDelete(id);

      if (!user) {
        throw ApiError.notFound('User not found');
      }

      res.status(StatusCodes.OK).json({
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
