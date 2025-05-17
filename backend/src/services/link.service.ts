import { Types } from "mongoose";
import { ILinkResponse } from "../interfaces/link.interface";
import { Link } from "../models/link.model";
import { User } from "../models/user.model";
import {
  CreateLinkInput,
  DeleteAllLinksInput,
  DeleteLinkInput,
  GetOneLinkInput,
} from "../schemas/link.schema";
import { TagService } from "./tag.service";

// Creates a new link for authenticated user
export async function createLink(
  userId: string,
  requestInput: CreateLinkInput["body"],
) {
  // Verify requesting user exists in database
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User doesn't exist in the system!");
  }

  const { title, type, link, tags: tagNames } = requestInput;

  // Process tags - create new ones if they don't exist
  const tags: Types.ObjectId[] = [];

  if (tagNames && tagNames.length > 0) {
    for (const tagName of tagNames) {
      try {
        const tag = await TagService.getTagUsingName(
          user._id as string,
          tagName,
        );
        if (tag) {
          tags.push(tag.tag._id);
        }
      } catch (error: any) {
        if (error.message === "Tag doesn't exist!") {
          const newTag = await TagService.createTag(user._id as string, {
            tag: tagName,
          });
          tags.push(newTag.tag._id);
        }
      }
    }
  }

  // Create and save new link document
  const createdLink = await Link.create({
    title,
    type,
    link,
    tags,
    userId: user._id,
  });

  await createdLink.save();

  console.log("Link created!");

  // Fetch complete link data with populated references
  const fetchedLink = await Link.findById(createdLink._id)
    .populate({
      path: "tags",
      select: "tag", // Only get the 'tag' field
    })
    .populate({
      path: "userId",
      select: "firstName lastName email", // Only get needed user fields
    });

  if (!fetchedLink) {
    throw new Error("Link doesn't exist!");
  }

  console.log("Link fetched!");

  return {
    link: {
      _id: fetchedLink._id,
      title: fetchedLink.title,
      type: fetchedLink.type,
      link: fetchedLink.link,
      tags: fetchedLink.tags,
      user: fetchedLink.userId,
      createdAt: fetchedLink.createdAt,
      updatedAt: fetchedLink.updatedAt,
    } as ILinkResponse,
  };
}

// Retrieves a single link with authorization check
export async function getOneLink(
  userId: string,
  requestInput: GetOneLinkInput["_id"],
) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Unauthorized request. User doesn't exist!");
  }

  const linkId = requestInput;

  // Get link with populated data in single query
  const link = await Link.findById(linkId)
    .populate({
      path: "tags",
      select: "tag", // Only get the 'tag' field
    })
    .populate({
      path: "userId",
      select: "firstName lastName email", // Only get needed user fields
    });

  if (!link) {
    throw new Error("Link doesn't exist!");
  }

  if (userId != link.userId._id.toString()) {
    throw new Error("Unauthorized request. This link doesn't belong to you!");
  }

  console.log("Link fetched!");

  return {
    link: {
      _id: link._id,
      title: link.title,
      type: link.type,
      link: link.link,
      tags: link.tags,
      user: link.userId,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
    } as ILinkResponse,
  };
}

// Gets all links for authenticated user
export async function getAllLinks(userId: string) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Unauthorized request. User doesn't exist!");
  }

  // Fetch all user's links with populated data
  const links = await Link.find({ userId: userId })
    .populate({
      path: "tags",
      select: "tag", // Only get the 'tag' field
    })
    .populate({
      path: "userId",
      select: "firstName lastName email", // Only get needed user fields
    });

  console.log("Links fetched!");

  return {
    links: links,
  };
}

// Deletes a specific link after authorization check
export async function deleteLink(
  userId: string,
  requestInput: DeleteLinkInput["_id"],
) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Unauthorized request. User doesn't exist!");
  }

  const linkId = requestInput;

  const link = await Link.findById(linkId);

  if (!link) {
    throw new Error("Link doesn't exist!");
  }

  if (userId != link.userId.toString()) {
    throw new Error("Unauthorized request. This link doesn't belong to you!");
  }

  // Delete and return deleted document with populated data
  const deletedLink = await Link.findByIdAndDelete(linkId)
    .populate({
      path: "tags",
      select: "tag", // Only get the 'tag' field
    })
    .populate({
      path: "userId",
      select: "firstName lastName email", // Only get needed user fields
    });

  if (!deletedLink) {
    throw new Error("Failed to delete link");
  }

  console.log("Link deleted!");

  return {
    link: {
      _id: deletedLink._id,
      title: deletedLink.title,
      type: deletedLink.type,
      link: deletedLink.link,
      tags: deletedLink.tags,
      user: deletedLink.userId,
      createdAt: deletedLink.createdAt,
      updatedAt: deletedLink.updatedAt,
    } as ILinkResponse,
  };
}

// Deletes all links for a user after validation
export async function deleteAllLinks(
  userIdFromAuth: string,
  requestInput: DeleteAllLinksInput["body"],
) {
  const userId = requestInput._id;

  if (userId === userIdFromAuth) {
    throw new Error("Unauthozied request. User validation failed!");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Unauthorized request. User doesn't exist!");
  }

  // Delete all links belonging to user
  const deletdLinks = await Link.deleteMany({ userId: user._id });

  if (deletdLinks.deletedCount == 0) {
    throw new Error("No links to delete!");
  }

  console.log("All links deleted!");

  return {
    deletedLinks: deletdLinks,
  };
}

// Export all service methods
export const LinkServices = {
  createLink,
  getOneLink,
  getAllLinks,
  deleteLink,
  deleteAllLinks,
};
