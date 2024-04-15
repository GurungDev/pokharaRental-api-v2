import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { ExpressError } from "../../common/class/error";
import { ResponseHandler } from "../../common/class/success.response";
import { RevenueService, revenueService } from "./revenue.service";


export class RevenueController {
    private readonly service: RevenueService;
    constructor() {
        this.service = revenueService
    }

    async getRevenues(req: Request,
        res: Response,
        next: NextFunction) {
        try {
            const userId = req.userId;
            const revenueList = await this.service.getRevenueAccordingToStore(userId);
            return ResponseHandler.success(res, "Revenue", revenueList);

        } catch (error) {
            next(error)
        }
    }

 
}