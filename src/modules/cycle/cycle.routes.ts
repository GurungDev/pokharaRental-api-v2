import { Router } from "express";
import authMiddleware from "../auth/middleware/auth.middleware";
import { cycleController } from "./cycle.controller";

const cycleRouter = Router({mergeParams: true});

cycleRouter.get("/", cycleController.get.bind(cycleController));
cycleRouter.get("/:id", cycleController.retrieve.bind(cycleController));
 

export default cycleRouter;
