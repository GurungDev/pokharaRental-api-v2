import { Router } from "express";
import { storeCustomerController } from "./customer.store.controller";
import { Validator } from "../../../../common/class/validator";
import { ValidateId } from "../../../../common/validation/id.validate";
import { RequestDataPaths } from "../../../../common/enum/enums";

const Store_customerRouter = Router({mergeParams: true});

Store_customerRouter.get("/", storeCustomerController.get.bind(storeCustomerController));//get many stores
Store_customerRouter.get("/:id",Validator.validate(ValidateId, RequestDataPaths.Params), storeCustomerController.retrieve.bind(storeCustomerController));//api to get one store along with their listings like boats and cycle

export default Store_customerRouter;