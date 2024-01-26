import { Router } from "express";
import adminBoatRouter from "../boat/storePanel/admin.boat.routes";
import adminStoreRouter from "../user/store/admin/admin.routes";
import adminCustomerRouter from "../user/customer/admin/admin.routes";

const adminRouter = Router({mergeParams: true});

adminRouter.use("/store", adminStoreRouter);
adminRouter.use("/customer", adminCustomerRouter);

export default adminRouter;
