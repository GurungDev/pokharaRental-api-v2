import { Router } from "express";
import authMiddleware from "../auth/middleware/auth.middleware";
import { cycleController } from "./cycle.controller";
import { Validator } from "../../common/class/validator";
import { PaginationRequest } from "../../common/validation/paginationRequest.validation";
import { RequestDataPaths } from "../../common/enum/enums";
import { GetCycleDto } from "./cycle.dto";

const cycleRouter = Router({mergeParams: true});

cycleRouter.get("/",Validator.validate(PaginationRequest, RequestDataPaths.Query), Validator.validate(GetCycleDto, RequestDataPaths.Query), cycleController.get.bind(cycleController));
cycleRouter.get("/:id", cycleController.retrieve.bind(cycleController));
 

export default cycleRouter;
