import { plainToInstance } from "class-transformer";
import { ResponseHandler } from "../../../common/class/success.response";
import { StoreHighlightService, storeHighlightService } from "./store.service";
import { NextFunction, Response, Request } from "express";
import { CreateHighLight, DeleteHighLight } from "./store.dto";


export class StoreHighLightController {
    private readonly service: StoreHighlightService;
    constructor() {
        this.service = storeHighlightService
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const highLightPayload = plainToInstance(CreateHighLight, req.body);
            const newHIghLight = await this.service.createHighLight(highLightPayload);
            return ResponseHandler.success(res,
                "Successfully Added",
                newHIghLight
            )
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { issueId, highlightFor } = plainToInstance(DeleteHighLight, req.body);
            await this.service.deleteHighLight(highlightFor, issueId);
            return ResponseHandler.success(res,
                "Successfully Deleted")
        } catch (error) {
            next(error)
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { issueId, highlightFor } = plainToInstance(DeleteHighLight, req.body);
            await this.service.getHighLightAccordingToIssuedItem(highlightFor, issueId);
            return ResponseHandler.success(res,
                "Successfully Deleted")
        } catch (error) {
            next(error)
        }
    }

}
export const storeHighlightController = new StoreHighLightController()