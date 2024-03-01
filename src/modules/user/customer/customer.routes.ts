import { Router } from "express";
import authMiddleware, { userChecker } from "../../auth/middleware/auth.middleware";
import boatRouter from "../../boat/boat.routes";
import cycleRouter from "../../cycle/cycle.routes";
import notificationRoutes from "../../notification/notification.routes";
import subscriberRoutes from "../../subscriber/subscriber.routes";
 import { customerController } from "./customer.controller";
import Store_customerRouter from "../store/customer/customer.store.router";

const userRouter = Router({ mergeParams: true });


userRouter.get(
    "/get-details",
    authMiddleware,
    userChecker,
    customerController.getCustomerDetails.bind(customerController)
);
userRouter.use("/boat", boatRouter)
userRouter.use("/cycle", cycleRouter)
userRouter.use("/store", Store_customerRouter)
userRouter.use("/subscriber", authMiddleware, userChecker, subscriberRoutes)
userRouter.use("/notification", authMiddleware, userChecker, notificationRoutes)

export default userRouter;