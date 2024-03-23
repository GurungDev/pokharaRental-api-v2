import { Router } from "express";
import adminBoatRouter from "../../boat/storePanel/admin.boat.routes";
import adminCycleRouter from "../../cycle/storePanel/admin.cycle.routes";
import storeSubscriberRoutes from "../../subscriber/storePanel/store.routes";
import StoreHighLightRouter from "../../listingHighlight/store panel/store.routes";
import StoreOrderRoutes from "../../order/store/store.route";
import authMiddleware, { storeChecker } from "../../auth/middleware/auth.middleware";

const storeRouter = Router({mergeParams: true});

storeRouter.use("/boat", adminBoatRouter)
storeRouter.use("/cycle", adminCycleRouter)
storeRouter.use("/subscriber", storeSubscriberRoutes)
storeRouter.use("/highLight", StoreHighLightRouter)
storeRouter.use("/order",authMiddleware ,storeChecker, StoreOrderRoutes)



export default storeRouter;