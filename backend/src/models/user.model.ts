import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

// Define User schema with field validations and options
const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true, // Mandatory field
      trim: true, // Remove whitespace
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate emails
      trim: true,
      lowercase: true, // Store emails in lowercase
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Minimum password length
      select: false, // Exclude from queries by default
    },
  },
  {
    timestamps: true, // Auto-add createdAt and updatedAt
    toJSON: {
      transform(doc, ret) {
        delete ret.password; // Never return password in JSON
        delete ret._v; // Remove version key
      },
    },
  },
);

// Create and export User model
export const User = model<IUser>("User", UserSchema);
