import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/jwt";
import { User } from "../models/user.model";

// Middleware to authenticate users using JWT tokens
// Verifies the token from Authorization header and attaches user to request object
export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get the Authorization header from the request
    const authHeader = req.headers["authorization"];

    // Check if Authorization header exists
    if (!authHeader) {
      res.status(401).json({ message: "Authorization header missing!" });
      return;
    }

    // Check if the token follows the 'Bearer' scheme
    if (!authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Invalid token format!" });
      return;
    }

    // Extract the token by removing 'Bearer ' prefix
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Authentication required!" });
      return;
    }

    // Verify the JWT token
    const verifiedToken = verifyToken(token);

    // Extract user ID from the verified token
    const userId = verifiedToken._id._id;

    // Find the user in database, excluding the password field
    const user = await User.findById(userId).select("-password");

    // Check if user exists
    if (!user) {
      res.status(401).json({ message: "User not found!" });
      return;
    }

    // Attach the user object to the request for use in subsequent middleware/routes
    // @ts-ignore - TypeScript ignore because we're adding a property to the Request object
    req.user = user;

    // Proceed to the next middleware/route handler
    next();
  } catch (err: any) {
    // Handle any errors during authentication process
    res.status(403).json({ message: "Unable to authenticate!" });
  }
};
