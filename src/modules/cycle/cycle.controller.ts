import { NextFunction, Response, Request } from "express";
import CycleService, {  cycleService } from "./cycle.service";
import { ResponseHandler } from "../../common/class/success.response";
import { plainToInstance } from "class-transformer";
import { ValidateId } from "../../common/validation/id.validate";
import { ExpressError } from "../../common/class/error";
import { PaginationRequest } from "../../common/validation/paginationRequest.validation";
import { GetCycleDto } from "./cycle.dto";

export default class CycleController{
    private readonly service: CycleService
    constructor(){
        this.service = cycleService;
    }

    async get(req: Request, res: Response, next: NextFunction){
        try {
            const paginationRequest = plainToInstance(PaginationRequest, req.query);
            const {search,storeId, sortBy, order} = plainToInstance(GetCycleDto, req.query);
            const cycle = await this.service.getAll(  paginationRequest,   {storeId,  search },   {  sortBy, order });
 
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
            const cycle = await this.service.getCycleById(id);
            if(!cycle){
                throw new ExpressError(404, "Cycle not found.")
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