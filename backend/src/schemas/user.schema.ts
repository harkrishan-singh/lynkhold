import { z } from "zod";

// Schema for user registration validation
export const registerUserSchema = z.object({
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

// Schema for user login validation
export const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

// Schema for user updatation validation
export const updateUserSchema = z.object({
  _id: z.string(),
  body: z.object({
    firstname: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

// Schema for user extraction validation
export const deleteUserSchema = z.object({
  body: z.object({
    _id: z.string(),
  }),
});

// Type definitions inferred from schemas
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type DeleteInput = z.infer<typeof deleteUserSchema>;
