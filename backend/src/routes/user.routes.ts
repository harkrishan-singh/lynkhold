import { Router } from "express";
import { userAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  deleteSchema,
  loginSchema,
  registerSchema,
  updateSchema,
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
userRouter.post("/register", validate(registerSchema), registerUser); // User registration route
userRouter.get("/login", validate(loginSchema), loginUser); // User login route
userRouter.get("/", userAuth, getUser); // Get user data (protected)
userRouter.put("/update/:id", validate(updateSchema), userAuth, updateUser); // Update user (protected)
userRouter.delete("/delete/:id", validate(deleteSchema), userAuth, deleteUser); // Delete user (protected)

export default userRouter; // Export the router
