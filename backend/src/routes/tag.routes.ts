import { Router } from "express";
import { createTag } from "../controllers/tag.controller";

const tagRouter = Router();

// POST endpoint for creating new tags
tagRouter.post("/create", createTag);

export default tagRouter;
