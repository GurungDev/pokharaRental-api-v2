import { NextFunction, Request,Response } from "express";
import { AuthService } from "./auth.service";
import { plainToInstance } from "class-transformer";
import { CustomerRegisterDto, StoreRegisterDto } from "./auth.dto";
import { ResponseHandler } from "../../common/class/success.response";
import { UserEnum } from "../../common/enum/enums";

export default class AuthController{
    private readonly service: AuthService;
    constructor(){
        this.service = new AuthService()
    }

    async login(req: Request, res: Response, next: NextFunction){
        try {
            const {email, password, validateFor} = req.body;
            const {id, name }:  any = await this.service.validate(email,password, validateFor);
            const token = await this.service.createToken(id,validateFor);
            return ResponseHandler.success(res, "Login Success", {
                id,
                name,
                token
            })
        } catch (error) {
            next(error)
        }
    }

    async RegisterStore(req: Request, res: Response, next: NextFunction){
        try {
            const registerDto = plainToInstance(StoreRegisterDto, req.body);
            const newStore = await this.service.registerStore(registerDto);
            return ResponseHandler.success(res, "Store registered", {
                store: {
                    id: newStore.id,
                    name: newStore.name,
                    email: newStore.email,
                    ownerName: newStore.ownerName
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async RegisterUser(req: Request, res: Response, next: NextFunction){
        try {
            const registerDto = plainToInstance(CustomerRegisterDto, req.body);
            const newUser = await this.service.registerUser(registerDto);
            return ResponseHandler.success(res, "User registered", {
                store: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

export const authController  = new AuthController();