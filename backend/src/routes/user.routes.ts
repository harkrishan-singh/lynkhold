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

// Create router instance for user-related endpoints
const userRouter = Router();

// Register new user - validates request body against schema
userRouter.post("/register", validate(registerUserSchema), registerUser);

// User login - validates credentials against schema
userRouter.get("/login", validate(loginUserSchema), loginUser);

// Get user profile - requires authentication
userRouter.get("/", userAuth, getUser);

// Update user details - validates input and requires auth
userRouter.put("/update/:id", validate(updateUserSchema), userAuth, updateUser);

// Delete user account - validates request and requires auth
userRouter.delete(
  "/delete/:id",
  validate(deleteUserSchema),
  userAuth,
  deleteUser,
);

export default userRouter;
