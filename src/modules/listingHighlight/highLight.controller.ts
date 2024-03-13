import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { HighlightService, highlightService } from "./highlight.service";
import { ResponseHandler } from "../../common/class/success.response";
import { DeleteHighLight } from "./store panel/store.dto";
import { RequestHighLightDto } from "./highlight.dto";


export class HighLightController {
    private readonly service: HighlightService;
    constructor() {
        this.service = highlightService
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { highlightFor, issueId } = plainToInstance(RequestHighLightDto, req.query);
            console.log(highlightFor)
            const responseHighlight = await this.service.getHighLightAccordingToIssuedItem(highlightFor, issueId);
            return ResponseHandler.success(res,
                "Successfully Retrieved", responseHighlight)
        } catch (error) {
            next(error)
        }
    }

}

export const highLightController = new HighLightController()