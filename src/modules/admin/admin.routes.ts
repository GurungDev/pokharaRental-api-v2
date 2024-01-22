import { Router } from "express";
import adminBoatRouter from "../boat/storePanel/admin.boat.routes";
import adminStoreRouter from "../user/store/admin/admin.routes";

const adminRouter = Router({mergeParams: true});

adminRouter.use("/store", adminStoreRouter);

export default adminRouter;
