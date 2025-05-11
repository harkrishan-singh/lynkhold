import { model, Schema } from "mongoose";
import { ITag } from "../interfaces/tag.interface";

// Define Tag schema with field validations and options
export const TagSchema = new Schema<ITag>({
  tag: {
    type: String,
    required: true, // Mandatory field
    unique: true, // Ensures no duplicate emails
    trim: true, // Remove whitespace
    lowercase: true, // Store tag in lowercase
  },
});

// Create and export Tag model
export const Tag = model<ITag>("Tag", TagSchema);
