import mongoose from 'mongoose';
import { env, isDev } from './env.js';

export async function connectDatabase(): Promise<void> {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.mongoUri);
  if (isDev) {
    console.log('[db] mongoose connected');
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
