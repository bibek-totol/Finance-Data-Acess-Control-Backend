import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FinancialRecordModel } from '../models/FinancialRecord.js';
import { ApiError } from '../utils/ApiError.js';
import mongoose from 'mongoose';

export const financeController = {
 
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type, category, startDate, endDate, page = 1, limit = 10 } = req.query as any;

      const filter: any = {};
      if (type) filter.type = type;
      if (category) filter.category = category;
      if (startDate || endDate) {
        filter.date = {};
        if (startDate) filter.date.$gte = new Date(startDate);
        if (endDate) filter.date.$lte = new Date(endDate);
      }

      const skip = (page - 1) * limit;

      const [records, total] = await Promise.all([
        FinancialRecordModel.find(filter)
          .sort({ date: -1 })
          .skip(skip)
          .limit(limit)
          .populate('createdBy', 'email'),
        FinancialRecordModel.countDocuments(filter),
      ]);

      res.status(StatusCodes.OK).json({
        data: records,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount, type, category, date, notes } = req.body;

      const record = await FinancialRecordModel.create({
        amount,
        type,
        category,
        date,
        notes,
        createdBy: req.user!.id,
      });

      res.status(StatusCodes.CREATED).json({
        message: 'Record created successfully',
        data: record,
      });
    } catch (error) {
      next(error);
    }
  },

  
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const record = await FinancialRecordModel.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!record) {
        throw ApiError.notFound('Record not found');
      }

      res.status(StatusCodes.OK).json({
        message: 'Record updated successfully',
        data: record,
      });
    } catch (error) {
      next(error);
    }
  },

  
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const record = await FinancialRecordModel.findByIdAndDelete(id);

      if (!record) {
        throw ApiError.notFound('Record not found');
      }

      res.status(StatusCodes.OK).json({
        message: 'Record deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  
  dashboardSummary: async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const totals = await FinancialRecordModel.aggregate([
        {
          $group: {
            _id: '$type',
            total: { $sum: '$amount' },
          },
        },
      ]);

      const income = totals.find((t) => t._id === 'income')?.total || 0;
      const expense = totals.find((t) => t._id === 'expense')?.total || 0;
      const netBalance = income - expense;

      
      const categoryBreakdown = await FinancialRecordModel.aggregate([
        {
          $group: {
            _id: { type: '$type', category: '$category' },
            total: { $sum: '$amount' },
          },
        },
        {
          $project: {
            _id: 0,
            type: '$_id.type',
            category: '$_id.category',
            total: 1,
          },
        },
      ]);

      
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const trends = await FinancialRecordModel.aggregate([
        {
          $match: {
            date: { $gte: sixMonthsAgo },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$date' },
              month: { $month: '$date' },
              type: '$type',
            },
            total: { $sum: '$amount' },
          },
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1 },
        },
      ]);

      
      const monthlyTrends: any[] = [];
      trends.forEach((item) => {
        const monthStr = `${item._id.year}-${String(item._id.month).padStart(
          2,
          '0'
        )}`;
        let monthObj = monthlyTrends.find((m) => (m as any).month === monthStr);
        if (!monthObj) {
          monthObj = { month: monthStr, income: 0, expense: 0 };
          monthlyTrends.push(monthObj);
        }
        if (item._id.type === 'income') (monthObj as any).income = item.total;
        else (monthObj as any).expense = item.total;
      });

      
      const recentActivity = await FinancialRecordModel.find()
        .sort({ createdAt: -1 })
        .limit(5);

      res.status(StatusCodes.OK).json({
        data: {
          summary: {
            totalIncome: income,
            totalExpense: expense,
            netBalance,
          },
          categoryBreakdown,
          recentActivity,
          monthlyTrends,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
