import { NextFunction, Response, Request } from "express";
import { AdminBoatSevice, adminBoatService } from "./admin.boat.service";
import { ResponseHandler } from "../../../common/class/success.response";
import { plainToInstance } from "class-transformer";
import { ValidateId } from "../../../common/validation/id.validate";
import { ExpressError } from "../../../common/class/error";
import { CreateBoatDto } from "./admin.boat.dto";
import { UserEnum } from "../../../common/enum/enums";

export default class AdminBoatcontroller{
    private readonly service: AdminBoatSevice;
    constructor(){
        this.service = adminBoatService;
    }

    private async checkStoreIdentity(req: Request){
       try {
        const storeId = req.userId;
        if(req.role != UserEnum.STORE){
            throw new ExpressError(400, "Only stores can add boats")
        }
        return storeId
       } catch (error) {
        return 0
       }
    }

    async post(req: Request, res: Response, next: NextFunction){
        try {
            const { capacity, priceInRs, title, description} = plainToInstance(
              CreateBoatDto,
              req.body
            );
            const storeId = await this.checkStoreIdentity(req);
            const newBoat = await this.service.createBoat({capacity, priceInRs, title, description, store: {id: storeId} })
            return ResponseHandler.success(res, "Boat created successfully", {
                newBoat,
            });
          } catch (error: any) {
            next(error);
          }
    }

    async get(req: Request, res: Response, next: NextFunction){
        try {
            const storeId = await this.checkStoreIdentity(req);
            const boats = await this.service.getBoatsAccordingToStoreId(storeId);
            if(!boats){
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

    async retrieve(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = plainToInstance(ValidateId, req.params);
            const boats = await this.service.getBoatAccordingToId(id);
            if(!boats){
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

    async patch(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = plainToInstance(ValidateId, req.params);
            const payload = plainToInstance(
                CreateBoatDto,
                req.body
            );
            const storeId = await this.checkStoreIdentity(req);
            const boats = await this.service.getBoatAccordingToId(id);
            if(!boats){
                throw new ExpressError(404, "Boats not found")
            }
            await this.service.patch(id, payload)
            return ResponseHandler.success(res, 
                "Successfully retrieved",
                boats
            )
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = plainToInstance(ValidateId, req.params);
            if(!await this.service.getBoatAccordingToId(id)){
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

    async getCount(req: Request, res: Response, next: NextFunction){
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