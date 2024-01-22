import { NextFunction, Response, Request } from "express";
import CycleService, {  cycleService } from "./cycle.service";
import { ResponseHandler } from "../../common/class/success.response";
import { plainToInstance } from "class-transformer";
import { ValidateId } from "../../common/validation/id.validate";
import { ExpressError } from "../../common/class/error";

export default class CycleController{
    private readonly service: CycleService
    constructor(){
        this.service = cycleService;
    }

    async get(req: Request, res: Response, next: NextFunction){
        try {
            const cycle = await this.service.getAll();
            return ResponseHandler.success(res, 
                "Successfully retrieved",
                cycle
            )
        } catch (error) {
            next(error)
        }
    }

    async retrieve(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = plainToInstance(ValidateId, req.params);
            const cycle = await this.service.getCycleAccordingToId(id);
            if(!cycle){
                throw new ExpressError(404, "Boat not found.")
            }
            return ResponseHandler.success(res, 
                "Successfully retrieved",
                cycle
            )
        } catch (error) {
            next(error)
        }
    }
 
}

export const cycleController = new CycleController();