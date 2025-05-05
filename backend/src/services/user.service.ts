import { User } from "../models/user.model";
import { LoginInput, RegisterInput, UpdateInput } from "../schemas/user.schema";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { generateToken } from "../config/jwt";

// Creates a new user with hashed password
export async function registerUser(requestInput: RegisterInput["body"]) {
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
    },
    token: token,
  };
}

// Authenticates user and returns JWT token
export async function loginUser(requestInput: LoginInput["body"]) {
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
    },
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
    },
  };
}

// Updates user information after verifying ownership
export async function updateUser(
  requestInput: UpdateInput["body"],
  userId: UpdateInput["_id"],
  userIdfromAuth: string,
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
    },
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
    },
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
