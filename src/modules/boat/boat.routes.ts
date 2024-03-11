import { Router } from "express";
import authMiddleware from "../auth/middleware/auth.middleware";
import { boatController } from "./boat.controller";
import { Validator } from "../../common/class/validator";
import { GetBoatDto } from "./boat.dto";
import { RequestDataPaths } from "../../common/enum/enums";
import { PaginationRequest } from "../../common/validation/paginationRequest.validation";
import { ValidateId } from "../../common/validation/id.validate";

const boatRouter = Router({ mergeParams: true });
boatRouter.get("/", Validator.validate(PaginationRequest, RequestDataPaths.Query), Validator.validate(GetBoatDto, RequestDataPaths.Query), boatController.get.bind(boatController));
boatRouter.get("/:id", Validator.validate(ValidateId, RequestDataPaths.Params), boatController.retrieve.bind(boatController));

export default boatRouter;
