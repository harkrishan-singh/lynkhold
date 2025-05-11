import { Types } from "mongoose";

// Tag document interface for MongoDB (includes all fields stored in DB)
export interface ITag {
  tag: string;
}

// Simplified tag interface for API responses (excludes sensitive data)
export interface ITagResponse {
  _id: Types.ObjectId;
  tag: string;
}
