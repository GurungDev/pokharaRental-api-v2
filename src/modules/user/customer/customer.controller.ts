import { NextFunction, Request, Response } from "express";
import { CustomerService, customerService } from "./customer.service";
import { ResponseHandler } from "../../../common/class/success.response";
import { ExpressError } from "../../../common/class/error";
import { plainToInstance } from "class-transformer";
import { ValidateId } from "../../../common/validation/id.validate";
import { CustomerPatchDto } from "./customer.dto";

export class CustomerController {
  protected service: CustomerService;
  constructor() {
    this.service = customerService
  }
  async getCustomerDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = plainToInstance(ValidateId, req.params)
      const response = await this.service.findBYId(id);
      if (!response) {
        throw new ExpressError(404, "User not found")
      }
      return ResponseHandler.success(res, "user details",
        this.service.transformOne(response)
      );
    } catch (error) {
      next(error);
    }
  }


  async update(req: Request, res: Response, next: NextFunction) {
    try {
       
      const userID = req.userId;
      const { name, phoneNumber } = plainToInstance(CustomerPatchDto, req.body)
      const response = await this.service.findBYId(userID);
      console.log(response)
      if (!response) {
        throw new ExpressError(404, "User not found")
      }
      if (name) { response.name = name }
     
      if (phoneNumber) { response.phoneNumber = phoneNumber }
      await response.save()
      return ResponseHandler.success(res, "User details",
        this.service.transformOne(response)
      );
    } catch (error) {
      next(error);
    }
  }
}

export const customerController = new CustomerController()