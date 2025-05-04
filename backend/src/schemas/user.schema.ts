import { string, z } from "zod";

// Schema for user registration validation
export const registerSchema = z.object({
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

// Schema for user login validation
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

// Schema for user updatation validation
export const updateSchema = z.object({
  body: z.object({
    firstname: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
  }),
  _id: string(),
});

// Schema for user extraction validation
export const deleteSchema = z.object({
  body: z.object({
    _id: string(),
  }),
});

// Type definitions inferred from schemas
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateInput = z.infer<typeof updateSchema>;
export type DeleteInput = z.infer<typeof deleteSchema>;
