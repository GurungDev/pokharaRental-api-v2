import { plainToInstance } from "class-transformer";
import { ExpressError } from "../../../common/class/error";
import { ResponseHandler } from "../../../common/class/success.response";
import { StoreService, storeService } from "./store.service";
import { NextFunction, Response, Request } from "express";
import { StoreUpdateDto } from "./store.dto";
import { SalesAnalysisDTO } from "../../order/store/store.dto";

export class StoreController {
    private readonly storeService: StoreService;
    constructor() {
        this.storeService = storeService
    }

    async getInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const storeId = req.userId;
            const response = await this.storeService.findBYId(storeId);
            if (!response) {
                throw new ExpressError(404, "Store not found")
            }
            return ResponseHandler.success(res, "Store details",
                this.storeService.transformOne(response)
            );
        } catch (error) {
            next(error);
        }

    }

    async getRevenue(req: Request, res: Response, next: NextFunction) {
        try {
            const storeId = req.userId;
            const { month, year } = plainToInstance(SalesAnalysisDTO, req.query)
            const response = await this.storeService.findSalesPerStore( month, year, storeId);
            if (!response) {
                throw new ExpressError(404, "Store not found")
            }
            return ResponseHandler.success(res, "Store details",
                response
            );
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const storeId = req.userId;
            const { name, ownerName, phoneNumber } = plainToInstance(StoreUpdateDto, req.body)
            const response = await this.storeService.findBYId(storeId);
            if (!response) {
                throw new ExpressError(404, "Store not found")
            }
            if (name) { response.name = name }
            if (ownerName) { response.ownerName = ownerName }
            if (phoneNumber) { response.phoneNumber = phoneNumber }
            await response.save()
            return ResponseHandler.success(res, "Store details",
                this.storeService.transformOne(response)
            );
        } catch (error) {
            next(error);
        }
    }

}
export const storeController = new StoreController();