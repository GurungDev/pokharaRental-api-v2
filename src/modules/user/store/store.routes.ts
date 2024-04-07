import { Router } from "express";
import adminBoatRouter from "../../boat/storePanel/admin.boat.routes";
import adminCycleRouter from "../../cycle/storePanel/admin.cycle.routes";
import storeSubscriberRoutes from "../../subscriber/storePanel/store.routes";
import StoreHighLightRouter from "../../listingHighlight/store panel/store.routes";
import StoreOrderRoutes from "../../order/store/store.route";
import authMiddleware, { storeChecker } from "../../auth/middleware/auth.middleware";
import storeNotificationRoutes from "../../notification/store/store.routes";
import { storeController } from "./store.controller";

const storeRouter = Router({ mergeParams: true });

storeRouter.get("/getInfo", authMiddleware, storeChecker, storeController.getInfo.bind(storeController))
storeRouter.patch("/", authMiddleware, storeChecker, storeController.update.bind(storeController))
storeRouter.use("/boat", adminBoatRouter)
storeRouter.use("/cycle", adminCycleRouter)
storeRouter.use("/subscriber", storeSubscriberRoutes)
storeRouter.use("/highlight", StoreHighLightRouter)
storeRouter.use("/order", authMiddleware, storeChecker, StoreOrderRoutes)
storeRouter.use("/notification", authMiddleware, storeChecker, storeNotificationRoutes)




export default storeRouter;