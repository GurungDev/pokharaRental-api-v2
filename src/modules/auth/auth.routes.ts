import { Router } from "express";
import { authController } from "./auth.controller";
import { CustomerRegisterDto, LoginDto, StoreRegisterDto } from "./auth.dto";
import { RequestDataPaths } from "../../common/enum/enums";
import { Validator } from "../../common/class/validator";

const authRouter = Router({mergeParams: true})

authRouter.post("/login",Validator.validate(LoginDto, RequestDataPaths.Body), authController.login.bind(authController));

authRouter.post("/register/store", Validator.validate(StoreRegisterDto, RequestDataPaths.Body), authController.RegisterStore.bind(authController));
authRouter.post("/register/user", Validator.validate(CustomerRegisterDto, RequestDataPaths.Body), authController.RegisterUser.bind(authController));

 
export default authRouter;
