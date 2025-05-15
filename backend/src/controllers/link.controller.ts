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

export const getOneLink = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user._id;
    const fetchedLink = await LinkServices.getOneLink(userId, req.params.id);
    res.status(200).json({
      message: "Link fetched successfully!",
      info: fetchedLink,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Unable to get the link!",
      error: err.message,
    });
  }
};

export const getAllLinks = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user._id;
    const fetchedLinks = await LinkServices.getAllLinks(userId);
    res.status(200).json({
      message: "Links fetched successfully!",
      info: fetchedLinks,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Unable to fetch all the links!",
      error: err.message,
    });
  }
};

export const deleteLink = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user._id;
    const linkId = req.params.id;
    const deletedLink = await LinkServices.deleteLink(userId, linkId);
    res.status(200).json({
      message: "Link deleted!",
      info: deletedLink,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Unable to delete the link!",
      error: err.message,
    });
  }
};

export const deleteAllLinks = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userIdFromAuth = req.user._id;
    const userId = req.body;
    const deletedLinks = await LinkServices.deleteAllLinks(
      userIdFromAuth,
      userId,
    );
    res.status(200).json({
      message: "Link deleted!",
      info: deletedLinks,
    });
  } catch (err: any) {
    res.status(400).json({
      message: "Unable to delete the link!",
      error: err.message,
    });
  }
};
