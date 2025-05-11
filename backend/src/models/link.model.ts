import { model, Schema, Types } from "mongoose";
import { ILink } from "../interfaces/link.interface";

// Define Link schema with field validations and options
export const LinkSchema = new Schema<ILink>(
  {
    title: {
      type: String,
      required: true, // Mandatory field
    },
    type: {
      type: String,
      required: true,
      trim: true, // Remove whitespace
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: Array,
      required: false,
      lowercase: true, // Store tags in lowercase
    },
    userId: {
      type: Types.ObjectId,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Auto-add createdAt and updatedAt
    toJSON: {
      transform(doc, ret) {
        delete ret._v; // Remove version key
      },
    },
  },
);

// Create and export Link model
export const Link = model<ILink>("Link", LinkSchema);
