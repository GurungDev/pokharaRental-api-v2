import { Router } from "express";
import { adminCycleController } from "./admin.cycle.controller";
import authMiddleware, {
  storeChecker,
} from "../../auth/middleware/auth.middleware";
import { Validator } from "../../../common/class/validator";
import { CreateCycleDto } from "./admin.cycle.dto";
import { RequestDataPaths } from "../../../common/enum/enums";
import { ValidateId } from "../../../common/validation/id.validate";

const adminCycleRouter = Router({ mergeParams: true });

adminCycleRouter.post(
  "/",
  authMiddleware,
  storeChecker,
  Validator.validate(CreateCycleDto, RequestDataPaths.Body),
  adminCycleController.post.bind(adminCycleController)
);
adminCycleRouter.get(
  "/",
  authMiddleware,
  storeChecker,
  adminCycleController.get.bind(adminCycleController)
);
adminCycleRouter.get(
  "/:id",
  authMiddleware,
  storeChecker,
  Validator.validate(ValidateId, RequestDataPaths.Params),
  adminCycleController.retrieve.bind(adminCycleController)
);
adminCycleRouter.patch(
  "/:id",
  authMiddleware,
  storeChecker,
  Validator.validate(ValidateId, RequestDataPaths.Params),
  Validator.validate(CreateCycleDto, RequestDataPaths.Body),
  adminCycleController.patch.bind(adminCycleController)
);
adminCycleRouter.get(
  "/count/store",
  authMiddleware,
  storeChecker,
  adminCycleController.getCount.bind(adminCycleController)
);
adminCycleRouter.delete(
  "/:id",
  authMiddleware,
  storeChecker,
  Validator.validate(ValidateId, RequestDataPaths.Params),
  adminCycleController.delete.bind(adminCycleController)
);

export default adminCycleRouter;
