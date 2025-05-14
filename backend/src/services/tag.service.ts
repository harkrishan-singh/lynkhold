import { ITagResponse } from "../interfaces/tag.interface";
import { Tag } from "../models/tag.model";
import { User } from "../models/user.model";
import {
  CreateTagInput,
  GetTagUsingIdInput,
  GetTagUsingNameInput,
} from "../schemas/tag.schema";

// Creates a new tag after checking for duplicates
async function createTag(userId: string, requestInput: CreateTagInput["body"]) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Unauthorized request!");
  }

  const tagInput = requestInput.tag;

  const alreadyExists = await Tag.findOne({
    tag: tagInput,
  });

  if (alreadyExists) {
    throw new Error("Tag already exists!");
  }

  // Create and save new tag
  const createdTag = await Tag.create({
    tag: tagInput,
  });
  await createdTag.save();

  console.log("Tag created successfully!");

  return {
    tag: {
      _id: createdTag._id,
      tag: createdTag.tag,
    } as ITagResponse,
  };
}

// Fetches tag by ID after verifying user auth
async function getTagUsingId(
  userId: string,
  requestInput: GetTagUsingIdInput["_id"],
) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Unauthorized request!");
  }

  const tagId = requestInput;

  const tag = await Tag.findById(tagId);

  if (!tag) {
    throw new Error("Tag doesn't exist!");
  }

  console.log("Tag fetched!");

  return {
    tag: {
      _id: tag._id,
      tag: tag.tag,
    } as ITagResponse,
  };
}

// Fetches tag by name after verifying user auth
async function getTagUsingName(
  userId: string,
  requestInput: GetTagUsingNameInput["tag"],
) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Unauthorized request!");
  }

  const tagName = requestInput;

  const tag = await Tag.findOne({
    tag: tagName,
  });

  if (!tag) {
    throw new Error("Tag doesn't exist!");
  }

  console.log("Tag fetched!");

  return {
    tag: {
      _id: tag._id,
      tag: tag.tag,
    } as ITagResponse,
  };
}

export const TagService = {
  createTag,
  getTagUsingId,
  getTagUsingName,
};
