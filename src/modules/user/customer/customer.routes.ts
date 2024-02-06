import { Router } from "express";
import boatRouter from "../../boat/boat.routes";
import cycleRouter from "../../cycle/cycle.routes";
import subscriberRoutes from "../../subscriber/subscriber.routes";
import authMiddleware, { userChecker } from "../../auth/middleware/auth.middleware";
 
const userRouter = Router({mergeParams: true});

userRouter.use("/boat", boatRouter)
userRouter.use("/cycle", cycleRouter)
userRouter.use("/subscriber", authMiddleware, userChecker, subscriberRoutes)
export default userRouter;