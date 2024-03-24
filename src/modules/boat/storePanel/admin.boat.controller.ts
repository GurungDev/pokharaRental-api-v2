import { NextFunction, Response, Request } from "express";
import { AdminBoatSevice, adminBoatService } from "./admin.boat.service";
import { ResponseHandler } from "../../../common/class/success.response";
import { plainToInstance } from "class-transformer";
import { ValidateId } from "../../../common/validation/id.validate";
import { ExpressError } from "../../../common/class/error";
import { CreateBoatDto } from "./admin.boat.dto";
import { NotificationTypeEnum, UserEnum } from "../../../common/enum/enums";
import { Notification, notificationService } from "../../notification/notification.service";
import { StoreService, storeService } from "../../user/store/store.service";

export default class AdminBoatcontroller {
    private readonly service: AdminBoatSevice;
    private readonly notificationService: Notification;
    private readonly store: StoreService;
    constructor() {
        this.service = adminBoatService;
        this.notificationService = notificationService
        this.store = storeService
    }

    private async checkStoreIdentity(req: Request) {
        try {
            const storeId = req.userId;
            if (req.role != UserEnum.STORE) {
                throw new ExpressError(400, "Only stores can add boats")
            }
            return storeId
        } catch (error) {
            return 0
        }
    }

    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const { capacity, priceInRs, title, description } = plainToInstance(
                CreateBoatDto,
                req.body
            );
            const thumbnail = req.body?.thumbnail
            if (!thumbnail) {
                throw new ExpressError(400, "Thumnail is required !!")
            }
            const secondaryImage = req.body?.secondaryImage
            const storeId = await this.checkStoreIdentity(req);
            const newBoat = await this.service.createBoat({ capacity, priceInRs, thumbnail, secondaryImage, title, description, store: { id: storeId } })
            ResponseHandler.success(res, "Boat created successfully", newBoat);
            const store = await this.store.findBYId(storeId)
            notificationService.createNotification({ notificationFor: NotificationTypeEnum.NEW_BOAT, title: `New Boat Added`, description: `${newBoat.title} cycle added in ${store?.name}.`, store: { id: storeId } })
        } catch (error: any) {
            next(error);
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const storeId = await this.checkStoreIdentity(req);
            const boats = await this.service.getBoatsAccordingToStoreId(storeId);
            if (!boats) {
                throw new ExpressError(404, "Boats not found")
            }
            return ResponseHandler.success(res,
                "Successfully retrieved",
                boats
            )
        } catch (error) {
            next(error)
        }
    }

    async retrieve(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(ValidateId, req.params);
            const boats = await this.service.getBoatAccordingToId(id);
            if (!boats) {
                throw new ExpressError(404, "Boats not found")
            }
            return ResponseHandler.success(res,
                "Successfully retrieved",
                boats
            )
        } catch (error) {
            next(error)
        }
    }

    async patch(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(ValidateId, req.params);
            const payload = plainToInstance(
                CreateBoatDto,
                req.body
            );
            const storeId = await this.checkStoreIdentity(req);
            const boats = await this.service.getBoatAccordingToId(id);
            if (!boats) {
                throw new ExpressError(404, "Boats not found")
            }

            const thumbnail = req.body?.thumbnail
            const secondaryImage = req.body?.secondaryImage

            await this.service.patch(id, { ...payload, thumbnail, secondaryImage })
            return ResponseHandler.success(res,
                "Successfully updated",
            )


        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(ValidateId, req.params);
            if (!await this.service.getBoatAccordingToId(id)) {
                throw new ExpressError(404, "boat not found.")
            }
            const boats = await this.service.delete(id);
            return ResponseHandler.success(res,
                "Successfully deleted",
            )
        } catch (error) {
            next(error)
        }
    }

    async getCount(req: Request, res: Response, next: NextFunction) {
        try {
            const storeId = await this.checkStoreIdentity(req);
            const boats = await this.service.getBoatsCountAccordingToStoreId(storeId);
            return ResponseHandler.success(res,
                "Successfully retrieved",
                boats
            )
        } catch (error) {
            next(error)
        }
    }


}

export const adminBoatController = new AdminBoatcontroller();