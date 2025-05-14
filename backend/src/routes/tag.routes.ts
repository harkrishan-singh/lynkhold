import { Router } from "express";
import {
  createTag,
  getTagUsingId,
  getTagUsingName,
} from "../controllers/tag.controller";
import { userAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createTagSchema } from "../schemas/tag.schema";

const tagRouter = Router();

// Route for creating tags with schema validation and auth
tagRouter.post("/create", validate(createTagSchema), userAuth, createTag);

// Route for creating tags with schema validation and auth
tagRouter.get("/getById/:tagId", userAuth, getTagUsingId);

// Route for fetching tags by name with auth
tagRouter.get("/getByName/:tagName", userAuth, getTagUsingName);

export default tagRouter;
