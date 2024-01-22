import { Router } from "express";
import { adminStoreController } from "./admin.controller";
import authMiddleware, { adminChecker } from "../../../auth/middleware/auth.middleware";
import { Validator } from "../../../../common/class/validator";
import { ValidateId } from "../../../../common/validation/id.validate";
import { RequestDataPaths } from "../../../../common/enum/enums";
import { ValidateBoolean } from "../../../../common/validation/bool.validate";

const adminStoreRouter = Router({ mergeParams: true });

adminStoreRouter.post(
  "/:id",
  authMiddleware,
  adminChecker,
  Validator.validate(ValidateId, RequestDataPaths.Params),
  adminStoreController.approve.bind(adminStoreController)
); //aprove the store

adminStoreRouter.get(
    "/",
    authMiddleware,
    adminChecker,
    adminStoreController.get.bind(adminStoreController)
  );   

adminStoreRouter.get(
    "/:id",
    authMiddleware,
    adminChecker,
    Validator.validate(ValidateId, RequestDataPaths.Params),

    adminStoreController.retrieve.bind(adminStoreController)
); 


export default adminStoreRouter;
