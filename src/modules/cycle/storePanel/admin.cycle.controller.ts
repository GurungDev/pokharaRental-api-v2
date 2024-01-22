import { NextFunction, Response, Request } from "express";
 import { ResponseHandler } from "../../../common/class/success.response";
import { plainToInstance } from "class-transformer";
import { ValidateId } from "../../../common/validation/id.validate";
import { ExpressError } from "../../../common/class/error";
 
import { UserEnum } from "../../../common/enum/enums";
import { AdminCycleSevice, adminCycleService } from "./admin.cycle.service";
import { CreateCycleDto } from "./admin.cycle.dto";

export default class AdminCyclecontroller{
    private readonly service: AdminCycleSevice;
    constructor(){
        this.service = adminCycleService;
    }

    private async checkStoreIdentity(req: Request){
        const storeId = req.userId;
        if(req.role != UserEnum.STORE){
            throw new ExpressError(400, "Only stores can add cycles")
        }
        return storeId
    }

    async post(req: Request, res: Response, next: NextFunction){
        try {
            const { priceInRs, title, description} = plainToInstance(
              CreateCycleDto,
              req.body
            );
            const storeId = await this.checkStoreIdentity(req);
            const newCycle = await this.service.createCycle({ priceInRs, title, description, store: {id: storeId} })
            return ResponseHandler.success(res, "Category created successfully", {
                newCycle,
            });
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

    async retrieve(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = plainToInstance(ValidateId, req.params);
            const cycles = await this.service.getCycleAccordingToId(id);
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

    async delete(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = plainToInstance(ValidateId, req.params);
            if(!await this.service.getCycleAccordingToId(id)){
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