import { NextFunction, Request, Response } from "express";
import { StoreOrderService, storeOrderService } from "./store.service";
import { plainToInstance } from "class-transformer";
import { ResponseHandler } from "../../../common/class/success.response";
import { ExpressError } from "../../../common/class/error";
import { SalesAnalysisDTO } from "./store.dto";


export class OrderStoreController {
    private readonly service: StoreOrderService;


    constructor() {
        this.service = storeOrderService;
    }

    async getOrders(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const storeId = req.userId;
            const response = await this.service.getOrders(storeId);
            if (!response) {
                throw new ExpressError(404, "Orders not found!");
            }
            return ResponseHandler.success(res, "Orders", response);
        } catch (error) {
            next(error);
        }
    }

    async getOrderPerDay(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const {month, year } = plainToInstance(SalesAnalysisDTO, req.query)
            const storeId = req.userId;
            const response = await this.service.findOrderCountPerDay(storeId, month, year);
            if (!response) {
                throw new ExpressError(404, "Orders not found!");
            }
            return ResponseHandler.success(res, "Orders", response);
        } catch (error) {
            next(error);
        }
    }
    async findSalesPerDay(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const {month, year } = plainToInstance(SalesAnalysisDTO, req.query)

            const storeId = req.userId;
            const response = await this.service.findSalesPerDay(storeId, month, year);
            if (!response) {
                throw new ExpressError(404, "Orders not found!");
            }
            return ResponseHandler.success(res, "Orders", response);
        } catch (error) {
            next(error);
        }
    }


}

export const orderStoreController = new OrderStoreController();