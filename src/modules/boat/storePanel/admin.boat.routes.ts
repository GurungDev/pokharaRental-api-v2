import { Router } from "express";
import { adminBoatController } from "./admin.boat.controller";
import authMiddleware, { storeChecker } from "../../auth/middleware/auth.middleware";
import { Validator } from "../../../common/class/validator";
import { RequestDataPaths } from "../../../common/enum/enums";
import { CreateBoatDto } from "./admin.boat.dto";
import { ValidateId } from "../../../common/validation/id.validate";

const adminBoatRouter = Router({mergeParams: true});

adminBoatRouter.post("/", authMiddleware, storeChecker, Validator.validate(CreateBoatDto, RequestDataPaths.Body), adminBoatController.post.bind(adminBoatController));
adminBoatRouter.get("/", authMiddleware,storeChecker, adminBoatController.get.bind(adminBoatController));
adminBoatRouter.get("/:id", authMiddleware,storeChecker, Validator.validate(ValidateId, RequestDataPaths.Params), adminBoatController.retrieve.bind(adminBoatController));
adminBoatRouter.patch("/:id", authMiddleware,storeChecker, Validator.validate(ValidateId, RequestDataPaths.Params),Validator.validate(CreateBoatDto, RequestDataPaths.Body), adminBoatController.retrieve.bind(adminBoatController));
adminBoatRouter.delete("/:id", authMiddleware, storeChecker, Validator.validate(ValidateId, RequestDataPaths.Params), adminBoatController.delete.bind(adminBoatController));
adminBoatRouter.get("/count/store", authMiddleware, storeChecker,  adminBoatController.getCount.bind(adminBoatController));

export default adminBoatRouter;
