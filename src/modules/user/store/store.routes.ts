import { Router } from "express";
import adminBoatRouter from "../../boat/storePanel/admin.boat.routes";
import adminCycleRouter from "../../cycle/storePanel/admin.cycle.routes";

const storeRouter = Router({mergeParams: true});

storeRouter.use("/boat", adminBoatRouter)
storeRouter.use("/cycle", adminCycleRouter)

export default storeRouter;