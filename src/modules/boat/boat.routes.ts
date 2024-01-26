import { Router } from "express";
import authMiddleware from "../auth/middleware/auth.middleware";
import { boatController } from "./boat.controller";

const boatRouter = Router({mergeParams: true});

boatRouter.get("/",  boatController.get.bind(boatController));
boatRouter.get("/:id",  boatController.retrieve.bind(boatController));

export default boatRouter;
