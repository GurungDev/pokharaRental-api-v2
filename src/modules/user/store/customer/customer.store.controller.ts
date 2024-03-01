import { plainToInstance } from "class-transformer";
import { ResponseHandler } from "../../../../common/class/success.response";
 import { NextFunction, Response, Request } from "express";
import { ValidateId } from "../../../../common/validation/id.validate";
import { ValidateBoolean } from "../../../../common/validation/bool.validate";
import { ExpressError } from "../../../../common/class/error";
import { StoreCustomerService, storeCustomerService } from "./customer.store.service";

export default class StoreCustomerController{
    private readonly service: StoreCustomerService;
    constructor(){
        this.service = storeCustomerService;
    }

    async get(req: Request, res: Response, next: NextFunction){
        try {
            const stores = await this.service.getAllStore();
            const serealized = this.service.transformMany(stores)
        
            return ResponseHandler.success(res, 
                "Successfully retrieved",
                serealized
            )
        } catch (error) {
            next(error)
        }
    }


    async retrieve(req: Request, res: Response, next: NextFunction){
        try {
        const {id} = plainToInstance(ValidateId, req.params)
    
        const responseStore = await this.service.findBYId(id );
        if(!responseStore){
            throw new ExpressError(404, "Store not found")
        }
        return ResponseHandler.success(res, 
            "Successfully retrieved",
            this.service.transformOne(responseStore)
        )
        } catch (error) {
            next(error)
        }
    }
}

export const storeCustomerController  = new StoreCustomerController();