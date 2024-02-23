import { Router } from "express";
import boatRouter from "../../boat/boat.routes";
import cycleRouter from "../../cycle/cycle.routes";
import subscriberRoutes from "../../subscriber/subscriber.routes";
import authMiddleware, { userChecker } from "../../auth/middleware/auth.middleware";
import { customerController } from "./customer.controller";
import notificationRoutes from "../../notification/notification.routes";

const userRouter = Router({ mergeParams: true });


userRouter.get(
    "/get-details",
    authMiddleware,
    userChecker,
    customerController.getCustomerDetails.bind(customerController)
);
userRouter.use("/boat", boatRouter)
userRouter.use("/cycle", cycleRouter)
userRouter.use("/subscriber", authMiddleware, userChecker, subscriberRoutes)
userRouter.use("/notification", authMiddleware, userChecker, notificationRoutes)

export default userRouter;