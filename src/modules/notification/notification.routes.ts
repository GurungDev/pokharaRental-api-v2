import { Router } from "express";
import { Validator } from "../../common/class/validator";
 
import { PaginationRequest } from "../../common/validation/paginationRequest.validation";
import { notificationController } from "./notification.controller";
import notificationSeenRoutes from "./seenNotification/notification.seen.routes";
import { RequestDataPaths } from "../../common/enum/enums";

const notificationRoutes = Router({ mergeParams: true });
notificationRoutes.get(
  "/",
  Validator.validate(PaginationRequest, RequestDataPaths.Query),
  notificationController.get.bind(notificationController)
);

notificationRoutes.use("/seen", notificationSeenRoutes)

export default notificationRoutes;
