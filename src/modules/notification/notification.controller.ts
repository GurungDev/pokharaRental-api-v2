import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../../common/class/success.response";
import { PaginationRequest } from "../../common/validation/paginationRequest.validation";
import { Notification, notificationService } from "./notification.service";
 

export class NotificationController{
    private readonly notificationService: Notification
    constructor(){
        this.notificationService = notificationService
    }

    async get(req: Request, res: Response, next: NextFunction){
        try {
       
            const user = req.userId 
            const paginationInfo = plainToInstance(PaginationRequest, req.query)
            const notifications = await this.notificationService.getNotificationAccordingToUserId( user,paginationInfo);
            return ResponseHandler.success(res, "Notification successfully retrieved", notifications)
        } catch (error) {
            next(error)
        }
    }
}

export const notificationController = new NotificationController();