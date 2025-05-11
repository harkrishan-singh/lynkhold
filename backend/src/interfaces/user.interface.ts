import { Document, Types } from "mongoose";

// User document interface for MongoDB (includes all fields stored in DB)
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Simplified user interface for API responses (excludes sensitive data)
export interface IUserResponse {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}
