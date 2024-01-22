import { Router } from "express";
import boatRouter from "../../boat/boat.routes";
import cycleRouter from "../../cycle/cycle.routes";

const userRouter = Router({mergeParams: true});

userRouter.use("/boat", boatRouter)
userRouter.use("/cycle", cycleRouter)

export default userRouter;