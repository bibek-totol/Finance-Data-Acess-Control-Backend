import mongoose, { Schema } from 'mongoose';


export interface IFinancialRecord {
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
  notes?: string;
  createdBy: mongoose.Types.ObjectId;
  isDeleted?: boolean;
  deletedAt?: Date | null;
}

const financialRecordSchema = new Schema<IFinancialRecord>(
  {
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    notes: { type: String, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: { type: Boolean, default: false, select: false },
    deletedAt: { type: Date, default: null, select: false },
  },
  { timestamps: true }
);

financialRecordSchema.index({ date: -1 });
financialRecordSchema.index({ category: 1 });
financialRecordSchema.index({ isDeleted: 1 });

export const FinancialRecordModel = mongoose.model<IFinancialRecord>(
  'FinancialRecord',
  financialRecordSchema
);
