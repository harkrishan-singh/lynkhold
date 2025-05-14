import { Request, Response } from "express";
import { LinkServices } from "../services/link.service";

export const createLink = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userIdFromAuth = req.user._id.toString();
    const createdLink = await LinkServices.createLink(userIdFromAuth, req.body);

    res.status(200).json({
      message: "Link created!",
      info: createdLink,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Unable to create the link!",
      error: err.message,
    });
  }
};
