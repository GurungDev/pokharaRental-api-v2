import { Router } from "express";
import { EsewaInitSinglePayloadDto } from "../paymentGateway/payment.dto";
import { RequestDataPaths } from "../../common/enum/enums";
import { Validator } from "../../common/class/validator";
import { orderController } from "./order.controller";
import { BuyNowDto, BuyNowEsewaDto } from "./order.dto";


const OrderRoutes = Router({ mergeParams: true });

OrderRoutes.post(
  "/esewa/init",
  Validator.validate(EsewaInitSinglePayloadDto, RequestDataPaths.Body),
  orderController.getEsewaConfiguration.bind(orderController)
);

OrderRoutes.post(
  "/",
  Validator.validate(BuyNowDto, RequestDataPaths.Body),
  orderController.buy.bind(orderController)
);


OrderRoutes.post(
  "/esewa",
  Validator.validate(BuyNowEsewaDto, RequestDataPaths.Body),
  orderController.esewaBuy.bind(orderController)
);


OrderRoutes.get(
  "/",
  orderController.getOrders.bind(orderController)
);



export default OrderRoutes;