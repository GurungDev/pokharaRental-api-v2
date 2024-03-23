import { Router } from "express";
import { orderStoreController } from "./store.controller";

const StoreOrderRoutes = Router({ mergeParams: true });
StoreOrderRoutes.get("/", orderStoreController.getOrders.bind(orderStoreController))

export default StoreOrderRoutes;