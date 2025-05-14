import { ILinkResponse } from "../interfaces/link.interface";
import { IUserResponse } from "../interfaces/user.interface";
import { Link } from "../models/link.model";
import { Tag } from "../models/tag.model";
import { User } from "../models/user.model";
import { CreateLinkInput } from "../schemas/link.schema";

export async function createLink(
  userId: CreateLinkInput["_id"],
  requestInput: CreateLinkInput["body"],
) {
  //   // Check if user exists using the userId (this id is received from a auth middleware which got it by verifing a token)
  //   const user = await User.findById(userId);
  //   if (!user) {
  //     throw new Error("User doesn't exist in the system!");
  //   }
  //   const { title, type, link, tagNames } = requestInput;
  //   const tags = [];
  //   tagNames.forEach((tagName) => {
  //     if (!(await Tag.find({ tag: tagName.lowercase }))) {
  //       const tag = tags.push(tag);
  //     }
  //   });
  //   const createdLink = await Link.create({
  //     title,
  //     type,
  //     link,
  //     tags,
  //     userId: user._id,
  //   });
  //   await createdLink.save();
  //   console.log("Link created!");
  //   return {
  //     user: {
  //       _id: user._id,
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       email: user.email,
  //     } as IUserResponse,
  //     link: {
  //       _id: createdLink._id,
  //       title: createdLink.title,
  //       type: createdLink.type,
  //       link: createdLink.link,
  //       tags: createdLink.tags,
  //       userId: createdLink.userId,
  //       createdAt: createdLink.createdAt,
  //       updatedAt: createdLink.updatedAt,
  //     } as ILinkResponse,
  //   };
}

export const LinkServices = {
  createLink,
};
