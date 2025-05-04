import { Router } from "express";
import {
  deleteUser,
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller";
import { userAuth } from "../middleware/auth.middleware";

const userRouter = Router(); // Create Express router instance

// Define routes with their corresponding controllers
userRouter.post("/register", registerUser); // User registration route
userRouter.get("/login", loginUser); // User login route
userRouter.get("/", userAuth, getUser); // Get user data (protected)
userRouter.put("/update/:id", userAuth, updateUser); // Update user (protected)
userRouter.delete("/delete/:id", userAuth, deleteUser); // Delete user (protected)

export default userRouter; // Export the router
