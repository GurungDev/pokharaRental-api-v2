import { Router } from "express";
 
 
import { SubscriberController, subscriberController } from "./subscriber.controller";
import { SubscriberDto } from "./subscriber.dto";
import { Validator } from "../../common/class/validator";
import { RequestDataPaths } from "../../common/enum/enums";
 

const subscriberRoutes = Router({ mergeParams: true });
subscriberRoutes.post(
  "/:storeId/follow", // notificationId
  Validator.validate(SubscriberDto, RequestDataPaths.Params),
  subscriberController.follow.bind(subscriberController)
);

subscriberRoutes.post(
  "/:storeId/unfollow", // notificationId
  Validator.validate(SubscriberDto, RequestDataPaths.Params),
  subscriberController.follow.bind(subscriberController)
);
 
subscriberRoutes.get(
  "/",  
  subscriberController.getAllFollowedStore.bind(subscriberController)
);
 

export default subscriberRoutes;
