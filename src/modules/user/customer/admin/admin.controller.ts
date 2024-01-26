import { plainToInstance } from "class-transformer";
import { ResponseHandler } from "../../../../common/class/success.response";
import { NextFunction, Response, Request } from "express";
import { ValidateId } from "../../../../common/validation/id.validate";
import { ValidateBoolean } from "../../../../common/validation/bool.validate";
import { ExpressError } from "../../../../common/class/error";
import { AdminCustomerService, adminCustomerService } from "./admin.service";

export default class AdminStoreController{
    private readonly service: AdminCustomerService;
    constructor(){
        this.service = adminCustomerService;
    }

 

    async get(req: Request, res: Response, next: NextFunction){
        try {
            const customers = await this.service.getAllCustomer();
            const serealized = this.service.transformMany(customers)
        
            return ResponseHandler.success(res, 
                "Successfully retrieved",
                serealized
            )
        } catch (error) {
            next(error)
        }
    }

    async getCount(req: Request, res: Response, next: NextFunction){
        try {
            const storesNumber = await this.service.getCustomerNumber();
            return ResponseHandler.success(res, 
                "Successfully retrieved",
                storesNumber
            )
        } catch (error) {
            next(error)
        }
    }


    async retrieve(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = plainToInstance(ValidateId, req.params)
    
        const responseCustomer = await this.service.findBYId(id );
        if(!responseCustomer){
            throw new ExpressError(404, "Customer not found")
        }
        return ResponseHandler.success(res, 
            "Successfully retrieved",
            this.service.transformOne(responseCustomer)
        )
        } catch (error) {
            next(error)
        }
    }
}

export const adminStoreController  = new AdminStoreController();