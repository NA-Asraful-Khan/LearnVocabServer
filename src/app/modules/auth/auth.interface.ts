import { Document } from 'mongoose';

export interface TLoginUser extends Document {
  email: string;
  password: string;
}
