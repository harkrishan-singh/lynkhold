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

export async function createLink(
  userId: string,
  requestInput: CreateLinkInput["body"],
) {
  // Check if user exists using the userId (this id is received from a auth middleware which got it by verifing a token)
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User doesn't exist in the system!");
  }

  const { title, type, link, tags: tagNames } = requestInput;

  // Handle tags - simpler approach
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

  const createdLink = await Link.create({
    title,
    type,
    link,
    tags,
    userId: user._id,
  });

  await createdLink.save();

  console.log("Link created!");

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

export async function getOneLink(
  userId: string,
  requestInput: GetOneLinkInput["_id"],
) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Unauthorized request. User doesn't exist!");
  }

  const linkId = requestInput;

  // Find link with populated tags and user data in a single query
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

export async function getAllLinks(userId: string) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Unauthorized request. User doesn't exist!");
  }

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

  const deletdLinks = await Link.deleteMany({ userId: user._id });

  if (deletdLinks.deletedCount == 0) {
    throw new Error("No links to delete!");
  }

  console.log("All links deleted!");

  return {
    deletedLinks: deletdLinks,
  };
}

export const LinkServices = {
  createLink,
  getOneLink,
  getAllLinks,
  deleteLink,
  deleteAllLinks,
};
