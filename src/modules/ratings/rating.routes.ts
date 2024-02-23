import { Router } from "express";
import authMiddleware, { userChecker } from "../auth/middleware/auth.middleware";
import ratingController from "./ratings.controller";
import { Validator } from "../../common/class/validator";
import { RateDto, RequestRatingDto, RequestTopRatingDto } from "./ratings.dto";
import { RequestDataPaths } from "../../common/enum/enums";



const ratingRoutes = Router({ mergeParams: true })
ratingRoutes.get("/top-rated",  Validator.validate(RequestTopRatingDto, RequestDataPaths.Query), ratingController.getTopRated.bind(ratingController));
ratingRoutes.post("/", authMiddleware, userChecker, Validator.validate(RateDto, RequestDataPaths.Body), ratingController.rate.bind(ratingController))
ratingRoutes.get("/", Validator.validate(RequestRatingDto, RequestDataPaths.Query), ratingController.getRating.bind(ratingController))

export default ratingRoutes;