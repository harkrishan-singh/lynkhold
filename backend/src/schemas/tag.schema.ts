import { z } from "zod";

// Schema for creating a new tag
export const createTagSchema = z.object({
  body: z.object({
    // Tag must be a string and will be converted to lowercase automatically
    tag: z.string().toLowerCase(),
  }),
});

export const getTagUsingIdSchema = z.object({
  _id: z.string(),
});

export const getTagUsingNameSchema = z.object({
  tag: z.string().toLowerCase(),
});

// Type definitions inferred from above schema
export type CreateTagInput = z.infer<typeof createTagSchema>;
export type GetTagUsingIdInput = z.infer<typeof getTagUsingIdSchema>;
export type GetTagUsingNameInput = z.infer<typeof getTagUsingNameSchema>;
