import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import {
  createLinkSchema,
  deleteAllLinksSchema,
  getSelectedTagLinksSchema,
  getSelectedTypeLinksSchema,
} from "../schemas/link.schema";
import {
  createLink,
  deleteAllLinks,
  deleteLink,
  getAllLinks,
  getOneLink,
  getSelectedTagLinks,
  getSelectedTypeLinks,
} from "../controllers/link.controller";
import { userAuth } from "../middleware/auth.middleware";

// Create main router for link-related endpoints
const linkRouter = Router();

// Create new link - validates input and requires authentication
linkRouter.post("/create", validate(createLinkSchema), userAuth, createLink);

// Get all links for authenticated user
linkRouter.get("/get/all", userAuth, getAllLinks);

// Get all links for authenticated user with a specific type
linkRouter.get(
  "/get/type/abc",
  validate(getSelectedTypeLinksSchema),
  userAuth,
  getSelectedTypeLinks,
);

// Get all links for authenticated user with a specific tag
linkRouter.get(
  "/get/tag",
  validate(getSelectedTagLinksSchema),
  userAuth,
  getSelectedTagLinks,
);

// Get single link by ID - requires authentication
linkRouter.get("/get/:id", userAuth, getOneLink);

// Delete all links - validates request body and requires auth
linkRouter.delete(
  "/delete/all",
  validate(deleteAllLinksSchema),
  userAuth,
  deleteAllLinks,
);

// Delete specific link by ID - requires authentication
linkRouter.delete("/delete/:id", userAuth, deleteLink);

export default linkRouter;
