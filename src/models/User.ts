import mongoose, { Schema } from 'mongoose';
import { ROLES, type Role } from '../constants/roles.js';

export interface IUser {
  email: string;
  passwordHash: string;
  role: Role;
  isActive: boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.VIEWER,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('User', userSchema);
