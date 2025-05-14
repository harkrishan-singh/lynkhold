import { Request, Response } from "express";
import { TagService } from "../services/tag.service";

export const createTag = async (req: Request, res: Response) => {
  try {
    const createdTag = await TagService.createTag(req.body);
    res.status(201).json({
      message: "Tag created successfully!",
      info: createdTag,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Unable to create the tag!",
      error: err.message,
    });
  }
};
