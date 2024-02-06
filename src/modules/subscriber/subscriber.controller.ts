import { NextFunction,Response, Request } from "express";
 
 
import { plainToInstance } from "class-transformer";
 
 
import { SubscriberDto } from "./subscriber.dto";
import { ResponseHandler } from "../../common/class/success.response";
import { ValidateId } from "../../common/validation/id.validate";
import { SubscriberService, subscriberService } from "./subscriber.service";
import { ExpressError } from "../../common/class/error";

export class SubscriberController{
    private readonly SubscriberService: SubscriberService
    constructor(){
        this.SubscriberService = subscriberService
    }

    async follow(req: Request, res: Response, next: NextFunction){
        try {
            const { storeId } = plainToInstance(SubscriberDto, req.params)
            const userId = req.userId 
            const check = await this.SubscriberService.getOne(userId, storeId)
            if(!check){
                await this.SubscriberService.create(userId, storeId);
            }
            return ResponseHandler.success(res, "Following Store")
        } catch (error) {
            next(error)
        }
    }

    async unfollow(req: Request, res: Response, next: NextFunction){
        try {
            const { storeId } = plainToInstance(SubscriberDto, req.params)
            const userId = req.userId 
            const check = await this.SubscriberService.getOne(userId, storeId)
            if(!check){
                throw new ExpressError(404, "Subscriber not found")
            }
            await this.SubscriberService.deleteSubscriber(userId, storeId);
            return ResponseHandler.success(res, "Unfollowed")
        } catch (error) {
            next(error)
        }
    }
 
    async getAllFollowedStore(req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.userId 
            const check = await this.SubscriberService.getSubscriberAccordingToUserId(userId)
            return ResponseHandler.success(res, "success", check)
        } catch (error) {
            next(error)
        }
    }
    
}

export const subscriberController = new SubscriberController();