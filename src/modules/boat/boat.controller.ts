import { NextFunction, Response, Request } from "express";
import BoatService, { boatService } from "./boat.service";
import { ResponseHandler } from "../../common/class/success.response";
import { plainToInstance } from "class-transformer";
import { ValidateId } from "../../common/validation/id.validate";
import { ExpressError } from "../../common/class/error";

export default class BoatController{
    private readonly service: BoatService
    constructor(){
        this.service = boatService;
    }

    async get(req: Request, res: Response, next: NextFunction){
        try {
            const boats = await this.service.getAll();
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
                throw new ExpressError(404, "Boat not found.")
            }
            return ResponseHandler.success(res, 
                "Successfully retrieved",
                boats
            )
        } catch (error) {
            next(error)
        }
    }

}

export const boatController = new BoatController();