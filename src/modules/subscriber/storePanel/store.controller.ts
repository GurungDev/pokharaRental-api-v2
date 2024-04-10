 import { ResponseHandler } from "../../../common/class/success.response";
import { StoreSubsriberService, storeSubsriberService } from "./store.service"
import { NextFunction,Response, Request } from "express";
 
export class StoreSubscriberController{
    private readonly SubscriberService: StoreSubsriberService
    constructor(){
        this.SubscriberService = storeSubsriberService
    }

    async getAllSubscriber(req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.userId 
            const subscriberList = await this.SubscriberService.getSubscriberAccordingToStoreId(userId)
            return ResponseHandler.success(res, "success", subscriberList)
        } catch (error) {
            next(error)
        }
    }

    async getCount(req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.userId 
            const subscriberList = await this.SubscriberService.getSubscriberCount(userId)
            return ResponseHandler.success(res, "success", subscriberList)
        } catch (error) {
            next(error)
        }
    }
}

export const storeSubscriberController  = new StoreSubscriberController();