import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { EsewaInitSinglePayloadDto, EsewaPayloadDto } from "../paymentGateway/payment.dto";
import { ExpressError } from "../../common/class/error";
import { checkOutPaymentService } from "../paymentGateway/payment.service";
import { ResponseHandler } from "../../common/class/success.response";
import { OrderService, orderService } from "./order.service";
import { BuyNowDto } from "./order.dto";
import { PaymentType, ProductEnum } from "../../common/enum/enums";


export class OrderController {
  private readonly service: OrderService;


  constructor() {
    this.service = orderService;
  }

  private async buyNowAndCreateOrder(
    quantity: number,
    priceOfSingleProduct: number,
    bookingDate: Date,
    durationInHour: number,
    customerID: number,
    totalPriceInRs: number,

    issueId: number,
    issuedFor: ProductEnum
  ) {

    switch (issuedFor) {
      case ProductEnum.BOAT:
        return await this.service.create(
          {
            quantity,
            priceOfSingleProduct,
            bookingDate,
            durationInHour,
            customer: { id: customerID },
            totalPriceInRs: totalPriceInRs,
            boat: { id: issueId }

          }
        );

      case ProductEnum.CYCLE:
        return await this.service.create(
          {
            quantity,
            priceOfSingleProduct,
            bookingDate,
            durationInHour,
            customer: { id: customerID },
            totalPriceInRs: totalPriceInRs,

            cycle: { id: issueId }
          }
        );
    }


  }


  async getEsewaConfiguration(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { transaction_uuid, product_code, issuedFor, productId, duration, quantity } =
        plainToInstance(EsewaInitSinglePayloadDto, req.body);

      const product = await this.service.getProduct(productId, issuedFor);

      if (!product) {
        throw new ExpressError(404, "Product not found!");
      }
      const totalPrice = product.priceInRs * quantity * duration;
      const response = await checkOutPaymentService.getEsewaSignature(
        `total_amount=${totalPrice},transaction_uuid=${transaction_uuid},product_code=${product_code}`
      );

      return ResponseHandler.success(res, "Esewa Signature", { signature: response, totalPrice: totalPrice });
    } catch (error) {
      next(error);
    }
  }


  //api after esewa success 
  //get data from signature and 
  async esewaBuy(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      


      return ResponseHandler.success(res, "Successfully purchased", {

      });
    } catch (error) {
      next(error);
    }
  }

  async buy(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      const { paymentMethod, quantity, token, bookingDate, durationInHour, issueId, issuedFor } = plainToInstance(
        BuyNowDto,
        req.body
      );
      const product = await this.service.getProduct(issueId, issuedFor);
      if (!product) {
        throw new ExpressError(404, "Product not found!");
      }
      const totalAmount = product.priceInRs * quantity;
      const priceOfSingleProduct = product.priceInRs;
      if (!totalAmount) {
        throw new ExpressError(404, " items not found");
      }
      let newOrder: any;

      //verifying cash checkout
      if (paymentMethod === PaymentType.CASH) {
        newOrder = await this.buyNowAndCreateOrder(
          quantity, priceOfSingleProduct, bookingDate, durationInHour, userId, totalAmount, issueId, issuedFor
        );
      }
      //verifying Esewa checkout
      if (paymentMethod === PaymentType.ESEWA) {

        let response = await checkOutPaymentService.verifyEsewaPayment(
          token
        );
        if (!response.success) {
          throw new ExpressError(400, response?.Message);
        }

        console.log(response)
        newOrder = await this.buyNowAndCreateOrder(
          quantity, priceOfSingleProduct, bookingDate, durationInHour, userId, totalAmount, issueId, issuedFor
        );

        // create a new row in payment entity
      }

      return ResponseHandler.success(res, "Successfully purchased", {
        orderId: newOrder?.id,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const orderController = new OrderController();