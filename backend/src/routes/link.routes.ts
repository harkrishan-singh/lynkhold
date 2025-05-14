import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { createLinkSchema } from "../schemas/link.schema";
import { createLink } from "../controllers/link.controller";
import { userAuth } from "../middleware/auth.middleware";

const linkRouter = Router();

linkRouter.post("/create", validate(createLinkSchema), userAuth, createLink);

export default linkRouter;
