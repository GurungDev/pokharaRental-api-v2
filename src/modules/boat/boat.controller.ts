import { NextFunction, Response, Request } from "express";
import BoatService, { boatService } from "./boat.service";
import { ResponseHandler } from "../../common/class/success.response";
import { plainToInstance } from "class-transformer";
import { ValidateId } from "../../common/validation/id.validate";
import { ExpressError } from "../../common/class/error";
import { PaginationRequest } from "../../common/validation/paginationRequest.validation";
import { GetBoatDto } from "./boat.dto";

export default class BoatController{
    private readonly service: BoatService
    constructor(){
        this.service = boatService;
    }

    async get(req: Request, res: Response, next: NextFunction){
        try {
            const paginationRequest = plainToInstance(PaginationRequest, req.query);
            const searchPayload = plainToInstance(GetBoatDto, req.query);
            const boats = await this.service.getAll( searchPayload, paginationRequest);
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