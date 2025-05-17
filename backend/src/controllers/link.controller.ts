import { Request, Response } from "express";
import { LinkServices } from "../services/link.service";

// Handles link creation requests (requires authenticated user)
export const createLink = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - Get user ID from authenticated request
    const userIdFromAuth = req.user._id.toString();

    // Create new link using service
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

// Fetches one link details (requires authenticated user)
export const getOneLink = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - Extract user ID from auth middleware
    const userId = req.user._id;
    const linkId = req.params.id; // Getting the link _id from the parameters

    // Fetch single link by ID using service
    const fetchedLink = await LinkServices.getOneLink(userId, linkId);

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

// Fetches all user links details (requires authenticated user)
export const getAllLinks = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - Extract user ID from auth middleware
    const userId = req.user._id;

    // Fetch all links belonging to user
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

// Deletes one link (requires authenticated user)
export const deleteLink = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - Extract user ID from auth middleware
    const userId = req.user._id;
    const linkId = req.params.id; // Getting the link _id from the parameters

    // Delete specific link using service
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

// Deletes all user links (requires authenticated user)
export const deleteAllLinks = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - Extract user ID from auth middleware
    const userIdFromAuth = req.user._id;
    const userId = req.body; // Getting the user _id in the body

    // Delete all links associated with user
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

// Fetches all user links details with a selected type (requires authenticated user)
export const getSelectedTypeLinks = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - Extract user ID from auth middleware
    const userId = req.user._id;
    const typeBody = req.body; // Getting the selected type in the body

    // Fetches all links associated with user with the selected type
    const fetchedLinks = await LinkServices.getSelectedTypeLinks(
      userId,
      typeBody,
    );

    res.status(200).json({
      message: "Links fetched successfully!",
      info: fetchedLinks,
    });
  } catch (err: any) {
    res.status(400).json({
      message: "Unable to fetch the links!",
      error: err.message,
    });
  }
};

// Fetches all user links details with a selected tag (requires authenticated user)
export const getSelectedTagLinks = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - Extract user ID from auth middleware
    const userId = req.user._id;
    const tagBody = req.body; // Getting the selected type in the body

    // Fetches all links associated with user with the selected tag
    const fetchedLinks = await LinkServices.getSelectedTagLinks(
      userId,
      tagBody,
    );

    res.status(200).json({
      message: "Links fetched successfully!",
      info: fetchedLinks,
    });
  } catch (err: any) {
    res.status(400).json({
      message: "Unable to fetch the links!",
      error: err.message,
    });
  }
};
