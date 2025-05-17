import { Document, Types } from "mongoose";

// Link document interface for MongoDB (includes all fields stored in DB)
export interface ILink extends Document {
  title: string;
  type: LinkType;
  link: string;
  tags: Types.ObjectId[];
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// Simplified link interface for API responses (excludes sensitive data)
export interface ILinkResponse {
  _id: Types.ObjectId;
  title: string;
  type: LinkType;
  link: string;
  tags: Types.ObjectId[];
  user: Types.ObjectId;
  createdAt: Date;
  updatedA?: Date;
}

// Enum defining possible types/categories for links
enum LinkType {
  ARTICLE = "article",
  VIDEO = "video",
  DOCUMENT = "document",
  WEBSITE = "website",
  SOCIAL_MEDIA = "social_media",
  OTHER = "other",
}
