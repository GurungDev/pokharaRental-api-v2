import { Router } from "express";
import { Validator } from "../../../common/class/validator";
import { NotificationMessageDto } from "../notification.dto";
import { RequestDataPaths } from "../../../common/enum/enums";
import { storeNofiticationController } from "./store.controller";

const storeNotificationRoutes = Router({ mergeParams: true });
storeNotificationRoutes.post(
    "/",
    Validator.validate(NotificationMessageDto, RequestDataPaths.Body),
    storeNofiticationController.post.bind(storeNofiticationController)
);


export default storeNotificationRoutes;