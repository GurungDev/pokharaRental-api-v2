import { Router } from "express";
import { highLightController } from "./highLight.controller";
import { Validator } from "../../common/class/validator";
import { RequestHighLightDto } from "./highlight.dto";
import { RequestDataPaths } from "../../common/enum/enums";


const HighLightRouter = Router({ mergeParams: true });
HighLightRouter.get("/", Validator.validate(RequestHighLightDto, RequestDataPaths.Query), highLightController.get.bind(highLightController))

export default HighLightRouter;