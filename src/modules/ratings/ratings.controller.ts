import { plainToInstance } from "class-transformer";
import { RatingService, ratingService } from "./ratings.service";
import { NextFunction, Response, Request } from "express";
import { RateDto, RequestRatingDto, RequestTopRatingDto } from "./ratings.dto";
import { ExpressError } from "../../common/class/error";
import { ResponseHandler } from "../../common/class/success.response";
import { RatingForEnum } from "../../common/enum/enums";
export class RatingController {
    private readonly service: RatingService;
    constructor() {
        this.service = ratingService
    }

    async rate(req: Request, res: Response, next: NextFunction) {
        try {
            const ratingPayload = plainToInstance(RateDto, req.body)
            const userId = req?.userId;
            if (!userId) {
                throw new ExpressError(404, "User not found")
            }
            let checkRating
            checkRating = await this.service.findRating({ ...ratingPayload, postedBy: userId })
            if (checkRating) {
                checkRating.star = ratingPayload.star;
                await checkRating.save()
            } else {
                checkRating = await this.service.createARating({ postedBy: { id: userId }, ...ratingPayload })
            }
            return ResponseHandler.success(res,
                "Successfully Rated",
                checkRating
            )
        } catch (error) {
            next(error)
        }
    }

    
    async getTopRated(req: Request, res: Response, next: NextFunction){
        try {
            const {ratingFor} = plainToInstance(RequestTopRatingDto, req.query)
            const result = await this.service.getTop5RatedAccordingToIssuedItem(ratingFor);
            return ResponseHandler.success(res, 
                "Successfully retrieved",
                result
            )
        } catch (error) {
            next(error)
        }
    }

    async getRating(req: Request, res: Response, next: NextFunction) {
        try {
            const { ratingFor, issueId } = plainToInstance(RequestRatingDto, req.query)
            const { ratingList, count } = await this.service.getRatingAccordingToIssuedItem(ratingFor, issueId)
            const totalRating = ratingList.reduce((sum, value) => {
                return sum + value.star
            }, 0)
            const averageRating = totalRating / count

            return ResponseHandler.success(res,
                "Successfully Rated",
                { rating: averageRating, totalRating: count }
            )
        } catch (error) {
            next(error)
        }
    }
}

const ratingController = new RatingController()
export default ratingController