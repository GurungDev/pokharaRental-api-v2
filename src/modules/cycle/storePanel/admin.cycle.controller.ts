import { NextFunction, Response, Request } from "express";
 import { ResponseHandler } from "../../../common/class/success.response";
import { plainToInstance } from "class-transformer";
import { ValidateId } from "../../../common/validation/id.validate";
import { ExpressError } from "../../../common/class/error";
 
import { NotificationTypeEnum, UserEnum } from "../../../common/enum/enums";
import { AdminCycleSevice, adminCycleService } from "./admin.cycle.service";
import { CreateCycleDto } from "./admin.cycle.dto";
import { Notification, notificationService } from "../../notification/notification.service";

export default class AdminCyclecontroller{
    private readonly service: AdminCycleSevice;
    private readonly notificationService: Notification;
    constructor(){
        this.service = adminCycleService;
        this.notificationService = notificationService;
    }

    private async checkStoreIdentity(req: Request){
        try {
            const storeId = req.userId;
        if(req.role != UserEnum.STORE){
            throw new ExpressError(400, "Only stores can add cycles")
        }
        return storeId
        } catch (error) {
            return 0
        }
    }

    async post(req: Request, res: Response, next: NextFunction){
        try {
            const { priceInRs, title, description} = plainToInstance(
              CreateCycleDto,
              req.body
            );
            const thumbnail = req.body?.thumbnail
            const secondaryImage = req.body?.secondaryImage
            const storeId = await this.checkStoreIdentity(req);
            const newCycle = await this.service.createCycle({ priceInRs, title,thumbnail, secondaryImage, description, store: {id: storeId} })
           
            ResponseHandler.success(res, "Category created successfully", {
                newCycle,
            });
            notificationService.createNotification({notificationFor: NotificationTypeEnum.NEW_CYCLE, title:`New Cycle Added`, description: `${newCycle.title} cycle added in ${newCycle.store.name}.`, store: {id: storeId}})
          } catch (error: any) {
            next(error);
          }
    }

    async get(req: Request, res: Response, next: NextFunction){
        try {
            const storeId = await this.checkStoreIdentity(req);
            const cycles = await this.service.getCyclesAccordingToStoreId(storeId);
            if(!cycles){
                throw new ExpressError(404, "Cycle not found.")
            }
            return ResponseHandler.success(res, 
                "Successfully retrieved",
                cycles
            )
        } catch (error) {
            next(error)
        }
    }

    async getCount(req: Request, res: Response, next: NextFunction){
        try {
            const storeId = await this.checkStoreIdentity(req);
            const cycles = await this.service.getCyclesCountAccordingToStoreId(storeId);
            return ResponseHandler.success(res, 
                "Successfully retrieved",
                cycles
            )
        } catch (error) {
            next(error)
        }
    }

    async retrieve(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = plainToInstance(ValidateId, req.params);
            const cycles = await this.service.getCycleById(id);
            if(!cycles){
                throw new ExpressError(404, "Cycle not found.")
            }
            return ResponseHandler.success(res, 
                "Successfully retrieved",
                cycles
            )
        } catch (error) {
            next(error)
        }
    }

    async patch(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = plainToInstance(ValidateId, req.params);
            const payload = plainToInstance(
                CreateCycleDto,
                req.body
            );
            const thumbnail = req.body?.thumbnail
            const secondaryImage = req.body?.secondaryImage
            await this.checkStoreIdentity(req);
            const cycle = await this.service.getCycleById(id);
            if(!cycle){
                throw new ExpressError(404, "cycle not found")
            }
            await this.service.patch(id, {...payload,thumbnail, secondaryImage })
            return ResponseHandler.success(res, 
                "Successfully updated"
            )
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try {
            
            const {id} = plainToInstance(ValidateId, req.params);
            if(!await this.service.getCycleById(id)){
                throw new ExpressError(404, "Cycle not found.")
            }
            const cycles = await this.service.delete(id);

            return ResponseHandler.success(res, 
                "Successfully deleted",
     
            )
        } catch (error) {
            next(error)
        }
    }

    
}

export const adminCycleController = new AdminCyclecontroller();