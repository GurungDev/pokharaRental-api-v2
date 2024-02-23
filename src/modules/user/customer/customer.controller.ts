import { NextFunction, Request, Response } from "express";
import { CustomerService, customerService } from "./customer.service";
import { ResponseHandler } from "../../../common/class/success.response";
import { ExpressError } from "../../../common/class/error";

export class CustomerController{
    protected service : CustomerService;
    constructor(){
        this.service = customerService
    }
    async getCustomerDetails(req: Request, res: Response, next: NextFunction) {
        try {
    
          const userId = req.userId;
          const response = await this.service.findBYId(userId);
          if(!response){
            throw new ExpressError(404, "User not found")
          }
          return ResponseHandler.success(res, "user details", {
            userData : this.service.transformOne(response)
          });
        } catch (error) {
          next(error);
        }
      }
}

export const customerController = new CustomerController()