import { z } from "zod";

// Valid options for link type
const typeOptions = [
  "ARTICLE",
  "VIDEO",
  "DOCUMENT",
  "WEBSITE",
  "SOCIAL_MEDIA",
  "OTHER",
] as const;

// Schema for creating a new link with required fields
export const createLinkSchema = z.object({
  _id: z.string(),
  body: z.object({
    title: z.string(),
    type: z.enum(typeOptions),
    link: z.string().url(),
    tags: z.array(z.string()).optional(), // Optional array of tags
  }),
});

// Schema for fetching a single link by ID
export const getOneLinkSchema = z.object({
  _id: z.string(),
  body: z.object({
    _id: z.string(),
  }),
});

// Schema for fetching all links (only requires user ID)
export const getAllLinksSchema = z.object({
  _id: z.string(),
});

// Schema for updating a link (same fields as create but all optional)
export const updateLinkSchema = z.object({
  _id: z.string(),
  body: z.object({
    title: z.string().optional(),
    type: z.enum(typeOptions).optional(),
    link: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

// Schema for deleting a single link by ID
export const deleteOneLinkSchema = z.object({
  _id: z.string(),
  body: z.object({
    _id: z.string(),
  }),
});

// Schema for deleting all links for a user
export const deleteAllLinksSchema = z.object({
  _id: z.string(),
});

// Type definitions inferred from schemas
export type CreateLinkInput = z.infer<typeof createLinkSchema>;
export type GetOneLinkInput = z.infer<typeof getOneLinkSchema>;
export type GetAllLinksInput = z.infer<typeof getAllLinksSchema>;
export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;
export type DeleteLinkInput = z.infer<typeof deleteOneLinkSchema>;
export type DeleteAllLinksInput = z.infer<typeof deleteAllLinksSchema>;

// TODO: Enhance schemas with custom error messages for validation
