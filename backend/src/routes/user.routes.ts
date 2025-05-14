import { Router } from "express";
import { userAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
  deleteUserSchema,
} from "../schemas/user.schema";
import {
  deleteUser,
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller";

const userRouter = Router(); // Create Express router instance

// Define routes with their corresponding controllers
userRouter.post("/register", validate(registerUserSchema), registerUser); // User registration route
userRouter.get("/login", validate(loginUserSchema), loginUser); // User login route
userRouter.get("/", userAuth, getUser); // Get user data (protected)
userRouter.put("/update/:id", validate(updateUserSchema), userAuth, updateUser); // Update user (protected)
userRouter.delete(
  "/delete/:id",
  validate(deleteUserSchema),
  userAuth,
  deleteUser,
); // Delete user (protected)

export default userRouter; // Export the router
