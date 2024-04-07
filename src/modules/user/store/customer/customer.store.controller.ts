import { plainToInstance } from "class-transformer";
import { ResponseHandler } from "../../../../common/class/success.response";
import { NextFunction, Response, Request } from "express";
import { ValidateId } from "../../../../common/validation/id.validate";
import { ValidateBoolean } from "../../../../common/validation/bool.validate";
import { ExpressError } from "../../../../common/class/error";
import { StoreCustomerService, storeCustomerService } from "./customer.store.service";
import { LocationDto } from "./customer.store.dto";

export default class StoreCustomerController {
    private readonly service: StoreCustomerService;
    constructor() {
        this.service = storeCustomerService;
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { lat, long } = plainToInstance(LocationDto, req.query)
            const stores = await this.service.getAllStore(lat, long);

            return ResponseHandler.success(res,
                "Successfully retrieved",
                stores
            )
        } catch (error) {
            next(error)
        }
    }


    async retrieve(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(ValidateId, req.params)

            const responseStore = await this.service.findBYId(id);
            if (!responseStore) {
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

export const storeCustomerController = new StoreCustomerController();