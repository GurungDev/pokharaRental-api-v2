 import { Router } from "express";
import { RequestHighLightDto } from "../highlight.dto";
import { RequestDataPaths } from "../../../common/enum/enums";
import { storeHighlightController } from "./store.controller";
import { Validator } from "../../../common/class/validator";
import authMiddleware, { storeChecker } from "../../auth/middleware/auth.middleware";
import { CreateHighLight } from "./store.dto";

const StoreHighLightRouter = Router({ mergeParams: true });
StoreHighLightRouter.get("/", authMiddleware ,storeChecker, Validator.validate(RequestHighLightDto, RequestDataPaths.Query), storeHighlightController.get.bind(storeHighlightController))
StoreHighLightRouter.post("/", authMiddleware ,storeChecker, Validator.validate(CreateHighLight, RequestDataPaths.Body), storeHighlightController.create.bind(storeHighlightController))
StoreHighLightRouter.delete("/", authMiddleware ,storeChecker, Validator.validate(RequestHighLightDto, RequestDataPaths.Body), storeHighlightController.delete.bind(storeHighlightController))

export default StoreHighLightRouter;