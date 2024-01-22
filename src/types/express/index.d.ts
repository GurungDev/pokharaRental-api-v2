import { UserEnum } from "../../common/enum/enums";

declare global{
     namespace Express {
    interface Request {
        userId: number;
        role: UserEnum;
    }
}}