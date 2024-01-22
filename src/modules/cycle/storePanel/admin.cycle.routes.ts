import { Router } from "express";
import { adminCycleController } from "./admin.cycle.controller";
import authMiddleware, { storeChecker } from "../../auth/middleware/auth.middleware";

const adminCycleRouter = Router({mergeParams: true});

adminCycleRouter.post("/", authMiddleware, storeChecker, adminCycleController.post.bind(adminCycleController));
adminCycleRouter.get("/", authMiddleware, storeChecker,  adminCycleController.get.bind(adminCycleController));
adminCycleRouter.get("/:id", authMiddleware,storeChecker,  adminCycleController.retrieve.bind(adminCycleController));
adminCycleRouter.delete("/:id", authMiddleware, storeChecker, adminCycleController.delete.bind(adminCycleController));

export default adminCycleRouter;
