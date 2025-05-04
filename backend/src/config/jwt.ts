import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/env";

// JWT variable defination from .env
const secret = JWT_SECRET;
const expires = "1d";

if (!secret || !expires) {
  throw new Error("JWT variables must be defined in environment variables");
}

// Generates a JWT token with the given payload
export const generateToken = (userId: any) => {
  return jwt.sign({ _id: userId }, secret, { expiresIn: expires });
};

// Verifies a JWT token and returns the payload if valid
export const verifyToken = (token: any) => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (err: any) {
    throw new Error("Invalid or expired token!");
  }
};
