import { NextFunction, Request, Response } from "express";
 
import { plainToInstance } from "class-transformer";
import { ResponseHandler } from "../../../common/class/success.response";
import { ValidateId } from "../../../common/validation/id.validate";
import { NotificationSeenService, notificationSeenService } from "./notification.seen.service";

import { NotificationSeenDto } from "./notification.seen.dto";

export class NotificationSeenController{
    private readonly notificationSeenService: NotificationSeenService
    constructor(){
        this.notificationSeenService = notificationSeenService
    }

    async post(req: Request, res: Response, next: NextFunction){
        try {
            const { notificationId } = plainToInstance(NotificationSeenDto, req.params)
            const user = req.userId
            const check = await this.notificationSeenService.getOne(user, notificationId)
            if(!check){
                await this.notificationSeenService.create(user, notificationId);
            }
            return ResponseHandler.success(res, "Notification seen")
        } catch (error) {
            next(error)
        }
    }

 
}

export const notificationSeenController = new NotificationSeenController();