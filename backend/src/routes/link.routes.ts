import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { createLinkSchema, deleteAllLinksSchema } from "../schemas/link.schema";
import {
  createLink,
  deleteAllLinks,
  deleteLink,
  getAllLinks,
  getOneLink,
} from "../controllers/link.controller";
import { userAuth } from "../middleware/auth.middleware";

const linkRouter = Router();

linkRouter.post("/create", validate(createLinkSchema), userAuth, createLink);

linkRouter.get("/get/all", userAuth, getAllLinks);

linkRouter.get("/get/:id", userAuth, getOneLink);

linkRouter.delete(
  "/delete/all",
  validate(deleteAllLinksSchema),
  userAuth,
  deleteAllLinks,
);

linkRouter.delete("/delete/:id", userAuth, deleteLink);

export default linkRouter;
