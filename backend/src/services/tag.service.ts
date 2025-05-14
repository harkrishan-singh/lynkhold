import { ITagResponse } from "../interfaces/tag.interface";
import { Tag } from "../models/tag.model";
import { CreateTagInput } from "../schemas/tag.schema";

async function createTag(requestInput: CreateTagInput["body"]) {
  const tagInput = requestInput.tag;
  const alreadyExists = await Tag.findOne({
    tag: tagInput,
  });
  if (alreadyExists) {
    throw new Error("Tag already exists!");
  }
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

export const TagService = {
  createTag,
};
