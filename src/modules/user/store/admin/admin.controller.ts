import { plainToInstance } from "class-transformer";
import { ResponseHandler } from "../../../../common/class/success.response";
import { AdminStoreService, adminStoreService } from "./admin.service";
import { NextFunction, Response, Request } from "express";
import { ValidateId } from "../../../../common/validation/id.validate";
import { ValidateBoolean } from "../../../../common/validation/bool.validate";
import { ExpressError } from "../../../../common/class/error";
import { SalesAnalysisDTO } from "../../../order/store/store.dto";

export default class AdminStoreController {
    private readonly service: AdminStoreService;
    constructor() {
        this.service = adminStoreService;
    }



    async get(req: Request, res: Response, next: NextFunction) {
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

    async getSalesPerStore(req: Request, res: Response, next: NextFunction) {
        try {
            const { month, year } = plainToInstance(SalesAnalysisDTO, req.query)
            let stores: any = await this.service.findSalesPerStore(month, year);


            return ResponseHandler.success(res,
                "Successfully retrieved",
                stores
            )
        } catch (error) {
            next(error)
        }
    }

    async getStorePerDay(req: Request, res: Response, next: NextFunction) {
        try {

            const stores = await this.service.findStoreJoinedPerDay();


            return ResponseHandler.success(res,
                "Successfully retrieved",
                stores
            )
        } catch (error) {
            next(error)
        }
    }


    async getCount(req: Request, res: Response, next: NextFunction) {
        try {
            const storesNumber = await this.service.getStoreCount();
            return ResponseHandler.success(res,
                "Successfully retrieved",
                storesNumber
            )
        } catch (error) {
            next(error)
        }
    }

    async approve(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(ValidateId, req.params)
            const approveStore = await this.service.approveStore(id);
            return ResponseHandler.success(res,
                "Successfully approved",
                this.service.transformOne(approveStore)
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

export const adminStoreController = new AdminStoreController();