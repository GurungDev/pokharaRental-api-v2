import { Router } from "express";
import authRouter from "./modules/auth/auth.routes";
import storeRouter from "./modules/user/store/store.routes";
import adminRouter from "./modules/admin/admin.routes";
import userRouter from "./modules/user/customer/customer.routes";

const MainRouter = Router({mergeParams: true})

 

MainRouter.use('/auth', authRouter)

MainRouter.use('/store', storeRouter)
MainRouter.use('/admin', adminRouter)
MainRouter.use('/customer', userRouter)


export default MainRouter;