import { Router } from "express";
import { adminStoreController } from "./admin.controller";
import authMiddleware, { adminChecker } from "../../../auth/middleware/auth.middleware";
import { Validator } from "../../../../common/class/validator";
import { ValidateId } from "../../../../common/validation/id.validate";
import { RequestDataPaths } from "../../../../common/enum/enums";

const adminCustomerRouter = Router({ mergeParams: true });

 

adminCustomerRouter.get(
    "/",
    authMiddleware,
    adminChecker,
    adminStoreController.get.bind(adminStoreController)
  );   
  adminCustomerRouter.get(
    "/number",
    authMiddleware,
    adminChecker,
    adminStoreController.getCount.bind(adminStoreController)
  );  

adminCustomerRouter.get(
    "/:id",
    authMiddleware,
    adminChecker,
    Validator.validate(ValidateId, RequestDataPaths.Params),

    adminStoreController.retrieve.bind(adminStoreController)
); 


export default adminCustomerRouter;
