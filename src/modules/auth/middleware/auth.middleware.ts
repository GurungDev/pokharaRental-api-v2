import { NextFunction, Request , Response} from "express";
import { ExpressError } from "../../../common/class/error";
import {authService} from "../auth.service";
import { storeService } from "../../user/store/store.service";
import { UserEnum } from "../../../common/enum/enums";
import { adminService } from "../../admin/admin.service";
import { customerService } from "../../user/customer/customer.service";

  
    export default async function authMiddleware(req: Request, res: Response, next: NextFunction){
        try {
            const token = req.headers["authorization"]?.split(" ");
            const tokenType = token?.[0] as string;
            const tokenValue = token?.[1] as string;
            if (tokenType !== "Bearer") {
              throw new ExpressError(401, "Invalid token");
            }
            if (!tokenValue) {
              throw new ExpressError(401, "Invalid token value");
            }
            const payload =await authService.verifyToken(tokenValue);
            const userId = payload.id;
            if (!userId) {
              throw new ExpressError(401, "Token can't be validated.");
            }  
            let user;
            switch (payload.role){
                case UserEnum.ADMIN:
                   user = await adminService.findById(userId);
                   req.role = UserEnum.ADMIN
                   break;
                case UserEnum.STORE:
                    user = await storeService.findBYId(userId);
                    req.role = UserEnum.STORE
                    break;
                case UserEnum.CUSTOMER:
                    user = await customerService.findBYId(userId)
                    req.role = UserEnum.CUSTOMER
                    break;            
             }   
            if (!user) {
              throw new ExpressError(401, "Token invalid: No user found.");
            }
            
            req.userId = user.id;
           
            next();
        } catch (error) {
            next(error)
        }
    }

export function adminChecker(req: Request, res: Response, next: NextFunction){
  try {
    
    if(req.role != UserEnum.ADMIN ||  !req.userId ){
      throw new ExpressError(404, "You are not authorized")
    }
    next();
  } catch (error) {
    next(error)
  }
}
export function storeChecker(req: Request, res: Response, next: NextFunction){
  try {
    
    if(req.role != UserEnum.STORE ||  !req.userId ){
      throw new ExpressError(404, "You are not authorized")
    }
    next();
  } catch (error) {
    next(error)
  }
}

export function userChecker(req: Request, res: Response, next: NextFunction){
  try {
    
    if(req.role != UserEnum.CUSTOMER ||  !req.userId ){
      throw new ExpressError(404, "You are not authorized")
    }
    next();
  } catch (error) {
    next(error)
  }
}
 
 