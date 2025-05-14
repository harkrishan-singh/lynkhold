import { Request, Response } from "express";
import { TagService } from "../services/tag.service";

// Handles tag creation request and response
export const createTag = async (req: Request, res: Response) => {
  try {
    // Call service to create tag and return success response
    const createdTag = await TagService.createTag(req.body);
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
