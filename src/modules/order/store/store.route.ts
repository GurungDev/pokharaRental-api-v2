import { Router } from "express";
import { orderStoreController } from "./store.controller";
import { SalesAnalysisDTO } from "./store.dto";
import { RequestDataPaths } from "../../../common/enum/enums";
import { Validator } from "../../../common/class/validator";

const StoreOrderRoutes = Router({ mergeParams: true });
StoreOrderRoutes.get("/", orderStoreController.getOrders.bind(orderStoreController))
StoreOrderRoutes.get("/analysis", orderStoreController.getOrderPerDay.bind(orderStoreController))
StoreOrderRoutes.get("/analysis/sales", Validator.validate(SalesAnalysisDTO, RequestDataPaths.Query), orderStoreController.findSalesPerDay.bind(orderStoreController))

export default StoreOrderRoutes;