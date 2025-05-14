import { Request, Response } from "express";
import { TagService } from "../services/tag.service";

// Handles tag creation request and response
export const createTag = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user._id;
    const tagBody = req.body;

    // Call service to create tag and return success response
    const createdTag = await TagService.createTag(userId, tagBody);
    res.status(201).json({
      message: "Tag created successfully!",
      info: createdTag,
    });
  } catch (err: any) {
    // Handle errors during tag creation
    res.status(500).json({
      message: "Unable to create the tag!",
      error: err.message,
    });
  }
};

// Handles fetching tag by ID
export const getTagUsingId = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user._id;
    const tagId = req.params.tagId;

    const fetchedTag = await TagService.getTagUsingId(userId, tagId);
    res.status(200).json({
      message: "Tag fetched!",
      info: fetchedTag,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Unable to fetch the tag!",
      errro: err.message,
    });
  }
};

// Handles fetching tag by name
export const getTagUsingName = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user._id;
    const tagName = req.params.tagName;

    console.log(req.params);

    const fetchedTag = await TagService.getTagUsingName(userId, tagName);
    res.status(200).json({
      message: "Tag fetched!",
      info: fetchedTag,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Unable to fetch the tag!",
      errro: err.message,
    });
  }
};
