import { Router } from "express";
 
import { Validator } from "../../../common/class/validator";
 
import { notificationSeenController } from "./notification.seen.controller";
import { NotificationSeenDto } from "./notification.seen.dto";
import { RequestDataPaths } from "../../../common/enum/enums";
 

const notificationSeenRoutes = Router({ mergeParams: true });
notificationSeenRoutes.post(
  "/:notificationId", // notificationId
  Validator.validate(NotificationSeenDto, RequestDataPaths.Params),
  notificationSeenController.post.bind(notificationSeenController)
);

notificationSeenRoutes.post(
  "/", 
  notificationSeenController.seenAll.bind(notificationSeenController)
);

export default notificationSeenRoutes;
