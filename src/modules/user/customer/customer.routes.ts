import { Router } from "express";
import authMiddleware, { userChecker } from "../../auth/middleware/auth.middleware";
import boatRouter from "../../boat/boat.routes";
import cycleRouter from "../../cycle/cycle.routes";
import notificationRoutes from "../../notification/notification.routes";
import subscriberRoutes from "../../subscriber/subscriber.routes";
import { customerController } from "./customer.controller";
import Store_customerRouter from "../store/customer/customer.store.router";
import OrderRoutes from "../../order/order.routes";
import { ValidateId } from "../../../common/validation/id.validate";
import { Validator } from "../../../common/class/validator";
import { RequestDataPaths } from "../../../common/enum/enums";
import { CustomerContactDto, CustomerPatchDto } from "./customer.dto";

const userRouter = Router({ mergeParams: true });


userRouter.use("/boat", boatRouter)
userRouter.use("/cycle", cycleRouter)
userRouter.use("/store", Store_customerRouter)
userRouter.use("/subscriber", authMiddleware, userChecker, subscriberRoutes)
userRouter.use("/notification", authMiddleware, userChecker, notificationRoutes)
userRouter.use("/order", authMiddleware, userChecker, OrderRoutes)


userRouter.get(
    "/:id",
    Validator.validate(ValidateId, RequestDataPaths.Params),
    customerController.getCustomerDetails.bind(customerController)
);
userRouter.post(
    "/contact",
    Validator.validate(CustomerContactDto, RequestDataPaths.Body),
    customerController.contactAdmin.bind(customerController)
);
userRouter.patch(
    "/",
    authMiddleware, userChecker,
    Validator.validate(CustomerPatchDto, RequestDataPaths.Body),
    customerController.update.bind(customerController)
);



export default userRouter;