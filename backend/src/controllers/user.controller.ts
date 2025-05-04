import { Request, Response } from "express";
import { UserService } from "../services/user.service";

// Handles user registration requests
export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.registerUser(req.body); // Delegate to service layer
    res.status(201).json({
      message: "User created successfully!",
      user: user,
    });
  } catch (err: any) {
    // Handle errors from validation or database operations
    res.status(500).json({
      message: "Unable to create the user!",
      error: err.message,
    });
  }
};

// Handles user login requests
export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.loginUser(req.body); // Delegate to service layer
    res.status(200).json({
      message: "User logged in successfully!",
      user: user,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Unable to login!",
      error: err.message,
    });
  }
};

// Fetches user details (requires authenticated user)
export const getUser = async (req: Request, res: Response) => {
  try {
    //@ts-ignore - Bypass TypeScript as middleware adds user to request
    const userId = req.user._id;

    const user = await UserService.getUser(userId); // Delegate to service layer
    res.status(200).json({
      message: "User found!",
      user: user,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Unable to find user!",
      error: err.message,
    });
  }
};

// Updates user information (requires ownership verification)
export const updateUser = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - Bypass TypeScript as middleware adds user to request
    const userIdFromAuth = req.user._id.toString();
    const updatedUser = await UserService.updateUser(
      req.body,
      req.params.id,
      userIdFromAuth,
    ); // Delegate to service layer
    res.status(200).json({
      message: "User updated!",
      info: updatedUser,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Unabled to update the user!",
      error: err.message,
    });
  }
};

// Deletes a user account (requires ownership verification)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - Bypass TypeScript as middleware adds user to request
    const userIdFromAuth = req.user._id.toString();
    const deletedUser = await UserService.deleteUser(
      req.params.id,
      userIdFromAuth,
    ); // Delegate to service layer
    res.status(200).json({
      message: "User deleted!",
      info: deletedUser,
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Unable to delete the user!",
      error: err.message,
    });
  }
};
