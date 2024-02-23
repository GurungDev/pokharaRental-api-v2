import { NextFunction, Response, Request } from "express";
import BoatService, { boatService } from "./boat.service";
import { ResponseHandler } from "../../common/class/success.response";
import { plainToInstance } from "class-transformer";
import { ValidateId } from "../../common/validation/id.validate";
import { ExpressError } from "../../common/class/error";
import { PaginationRequest } from "../../common/validation/paginationRequest.validation";
import { GetBoatDto } from "./boat.dto";
import { RatingService, ratingService } from "../ratings/ratings.service";
import { RatingForEnum } from "../../common/enum/enums";

export default class BoatController{
    private readonly service: BoatService
    protected readonly ratingService: RatingService;
    constructor(){
        this.service = boatService;
        this.ratingService = ratingService
    }

    async get(req: Request, res: Response, next: NextFunction){
        try {
            const paginationRequest = plainToInstance(PaginationRequest, req.query);
            const {search,storeId, sortBy, order} = plainToInstance(GetBoatDto, req.query);
            const boats = await this.service.getAllBoats(  paginationRequest,   {storeId,  search },   {  sortBy, order });
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
            const boats = await this.service.getBoatById(id);
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