import { User } from "../models/user.model";
import {
  RegisterUserInput,
  LoginUserInput,
  UpdateUserInput,
} from "../schemas/user.schema";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { generateToken } from "../config/jwt";
import { IUserResponse } from "../interfaces/user.interface";

// Creates a new user with hashed password
export async function registerUser(requestInput: RegisterUserInput["body"]) {
  const { firstName, lastName, email, password } = requestInput;

  // Check for existing user with same email
  if (await User.findOne({ email })) {
    throw new Error("User with email already exist!");
  }

  // Hash password (need to await since hashPassword is async)
  const hashedPassword: string = await hashPassword(password as string);

  // Create and save new user
  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });

  await user.save();

  console.log("User created!:");

  // Generate JWT token for the new user
  const token = generateToken({ _id: user._id });

  return {
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
    } as IUserResponse,
    token: token,
  };
}

// Authenticates user and returns JWT token
export async function loginUser(requestInput: LoginUserInput["body"]) {
  const { email, password } = requestInput;

  // Find user including password field (normally excluded)
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("User doesn't exist!");
  }

  // Verify provided password against stored hash
  const passwordVerification: boolean = await verifyPassword(
    password as string,
    user.password,
  );

  if (!passwordVerification) {
    throw new Error("Wrong password!");
  }

  console.log("User logged-in!");

  // Generate JWT token for authenticated user
  const token = generateToken({ _id: user._id });

  return {
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
    } as IUserResponse,
    token: token,
  };
}

// Retrieves user details by ID
export async function getUser(requestInput: string) {
  const userId = requestInput;

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Try again ");
  }

  console.log("User fetched!");

  return {
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as IUserResponse,
  };
}

// Updates user information after verifying ownership
export async function updateUser(
  userId: UpdateUserInput["_id"],
  userIdfromAuth: string,
  requestInput: UpdateUserInput["body"],
) {
  // Verify requesting user owns the account being modified
  if (userId !== userIdfromAuth) {
    throw new Error("Unauthorized request. Can not be completed!");
  }

  // Perform update and return new document
  const updatedUser = await User.findByIdAndUpdate(userId, requestInput, {
    new: true,
  });

  if (!updatedUser) {
    throw new Error("Some error occurted while updating the user!");
  }

  console.log("User updated!");

  return {
    user: {
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    } as IUserResponse,
  };
}

// Deletes user account after verifying ownership
export async function deleteUser(userId: string, userIdfromAuth: string) {
  // Verify requesting user owns the account being deleted
  if (userId !== userIdfromAuth) {
    throw new Error("Unauthorized request. Can not be completed!");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User doesn't exist!");
  }

  const deletedUser = await User.findByIdAndDelete(userId);

  console.log("User deleted!");

  return {
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as IUserResponse,
    deletedUser: deletedUser,
  };
}

// Service methods export
export const UserService = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
};
