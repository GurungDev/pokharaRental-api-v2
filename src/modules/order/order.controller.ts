import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../../common/class/error";
import { ResponseHandler } from "../../common/class/success.response";
import { PaymentType, ProductEnum } from "../../common/enum/enums";
import emailService from "../email/emai.service";
import { EsewaInitSinglePayloadDto, KhaltiInitPayloadDto, KhaltiPayloadDto } from "../paymentGateway/payment.dto";
import { CheckOutPaymentService, checkOutPaymentService } from "../paymentGateway/payment.service";
import { CustomerService, customerService } from "../user/customer/customer.service";
import { BuyNowDto, BuyNowEsewaDto, OrderDto } from "./order.dto";
import { OrderService, orderService } from "./order.service";
import { RevenueService, revenueService } from "../revenue/revenue.service";


export class OrderController {
  private readonly service: OrderService;
  private readonly paymentservice: CheckOutPaymentService;
  private readonly userService: CustomerService;
 
  constructor() {
    this.service = orderService;
    this.paymentservice = checkOutPaymentService;
    this.userService = customerService;
   }

  private async buyNowAndCreateOrder(
    quantity: number,
    priceOfSingleProduct: number,
    bookingDate: Date,
    durationInHour: number,
    customerID: number,
    totalPriceInRs: number,
    issueId: number,
    issuedFor: ProductEnum,
    isPaid: boolean,
    paymentType: PaymentType,
    transaction_uuid?: string
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
            boat: { id: issueId },
            isPaid,
            paymentType,
            transaction_uuid
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

            cycle: { id: issueId },
            isPaid,
            paymentType,
            transaction_uuid
          }
        );
    }


  }

  async getOrders(req: Request,
    res: Response,
    next: NextFunction) {
    try {
      const userId = req.userId;
      const { orderBy } = plainToInstance(OrderDto, req.query);
      console.log(req.query)
      const orderList = await this.service.findByCustomerId(userId, orderBy);
      return ResponseHandler.success(res, "Orders", orderList);

    } catch (error) {
      next(error)
    }
  }

  async khaltiInit(req: Request, res: Response, next: NextFunction) {
    try {
      const { transaction_uuid, bookingDate, duration, productId, issuedFor, quantity, return_url, website_url } = plainToInstance(KhaltiInitPayloadDto, req.body);
      const product = await this.service.getProduct(productId, issuedFor);
      const userId = req.userId;
      if (!product) { throw new ExpressError(404, "product not found.") }
      const total_amount = (product.priceInRs) * quantity * duration * 100;
      const response = await checkOutPaymentService.initKhaltiPayemnt(plainToInstance(KhaltiInitPayloadDto, req.body), total_amount.toString(), transaction_uuid, `test`);
      if (!response.success) {
        throw new ExpressError(400, response?.Message);
      }
      let newOrder: any;

      newOrder = await this.buyNowAndCreateOrder(
        quantity, product.priceInRs, bookingDate, duration, userId, total_amount / 100, productId, issuedFor, false, PaymentType.KHALTI, response.Data.pidx
      );
      return ResponseHandler.success(res, "init success", response);
    } catch (error) {
      next(error);
    }
  }

  //api after esewa success 
  //get data from signature and 
  async khaltiBuy(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      const { pidx } = plainToInstance(
        KhaltiPayloadDto,
        req.body
      );

      const check = await this.paymentservice.verifyKhaltiPayment({ pidx })
      const product = await this.service.getOrder(check.Data?.pidx);
      
      if (!product) {
        throw new ExpressError(404, "Order not found!");
      }
       
      product.transaction_code = check?.Data?.transaction_id
      product.isPaid = true;
      product.save()

      const user = await this.userService.findBYId(userId);
      if (user) {
        emailService.mailOrderComplete(user?.email, product.quantity, product.priceOfSingleProduct, product.bookingDate, product.durationInHour, product.totalPriceInRs, product.transaction_uuid)
      }

      return ResponseHandler.success(res, "Successfully purchased");




    } catch (error) {
      next(error);
    }
  }


  async getEsewaConfiguration(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { transaction_uuid, product_code, bookingDate, issuedFor, productId, duration, quantity } =
        plainToInstance(EsewaInitSinglePayloadDto, req.body);
      const userId = req.userId;
      const product = await this.service.getProduct(productId, issuedFor);

      if (!product) {
        throw new ExpressError(404, "Product not found!");
      }
      const totalPrice = product.priceInRs * quantity * duration;
      const response = await checkOutPaymentService.getEsewaSignature(
        `total_amount=${totalPrice},transaction_uuid=${transaction_uuid},product_code=${product_code}`
      );
      let newOrder: any;
        
      newOrder = await this.buyNowAndCreateOrder(
        quantity, product.priceInRs, bookingDate, duration, userId, totalPrice, productId, issuedFor, false, PaymentType.ESEWA, transaction_uuid
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
      const { token } = plainToInstance(
        BuyNowEsewaDto,
        req.body
      );

      const check = await this.paymentservice.verifyEsewaPayment(token)
      const product = await this.service.getOrder(check.Data?.transaction_uuid);
      if (!product) {
        throw new ExpressError(404, "Order not found!");
      }
      product.transaction_code = check?.Data?.transaction_code
      product.isPaid = true;
      product.save()
      console.log(product)
      const user = await this.userService.findBYId(userId);
      if (user) {
        emailService.mailOrderComplete(user?.email, product.quantity, product.priceOfSingleProduct, product.bookingDate, product.durationInHour, product.totalPriceInRs, product.transaction_uuid)
      }
      return ResponseHandler.success(res, "Successfully purchased", {
      });



    } catch (error) {
      next(error);
    }
  }




  async buy(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      const { paymentMethod, transaction_uuid, quantity, token, bookingDate, durationInHour, issueId, issuedFor } = plainToInstance(
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
          quantity, priceOfSingleProduct, bookingDate, durationInHour, userId, totalAmount, issueId, issuedFor, true, PaymentType.CASH, transaction_uuid
        );
      }

      const user = await this.userService.findBYId(userId);
      if (user) {
        emailService.mailOrderComplete(user?.email, quantity, priceOfSingleProduct, bookingDate, durationInHour, totalAmount, transaction_uuid)
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