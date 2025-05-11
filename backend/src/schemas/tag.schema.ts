import { z } from "zod";

// Schema for creating a new tag
export const createTag = z.object({
  body: z.object({
    // Tag must be a string and will be converted to lowercase automatically
    tag: z.string().toLowerCase(),
  }),
});

// Type definitions inferred from above schema
export type CreateTagInput = z.infer<typeof createTag>;
