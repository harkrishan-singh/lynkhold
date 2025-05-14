import { Router } from "express";
import { createTag } from "../controllers/tag.controller";

const tagRouter = Router();

tagRouter.post("/create", createTag);

export default tagRouter;
