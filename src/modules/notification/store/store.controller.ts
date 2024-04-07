import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../../../common/class/success.response";
import { notificationService } from "../notification.service";
import { NotificationTypeEnum } from "../../../common/enum/enums";
import { StoreService, storeService } from "../../user/store/store.service";
import { ExpressError } from "../../../common/class/error";
import { NotificationMessageDto } from "../notification.dto";



export class StoreNofiticationController {
    private readonly storeService: StoreService;
    constructor() {
        this.storeService = storeService;
    }
    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.userId;
            const { title, body } = plainToInstance(NotificationMessageDto, req.body)
            const store = await this.storeService.findBYId(id);
            if (!store) {
                throw new ExpressError(404, "store not found.")
            }
            await notificationService.createNotification({ notificationFor: NotificationTypeEnum.PUSH_NOTIFICATION, title: title, description: body, store: { id: id } })

            return ResponseHandler.success(res, "Notification sent.")
        } catch (error) {
            next(error)
        }
    }
}

export const storeNofiticationController = new StoreNofiticationController();