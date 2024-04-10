import { Router } from "express";
import { storeSubscriberController } from "./store.controller";
import authMiddleware, { storeChecker } from "../../auth/middleware/auth.middleware";

const storeSubscriberRoutes = Router({ mergeParams: true });
 
storeSubscriberRoutes.get(
  "/",  
  authMiddleware,
  storeChecker,
  storeSubscriberController.getAllSubscriber.bind(storeSubscriberController)
);
storeSubscriberRoutes.get(
  "/count",  
  authMiddleware,
  storeChecker,
  storeSubscriberController.getCount.bind(storeSubscriberController)
);

export default storeSubscriberRoutes;
