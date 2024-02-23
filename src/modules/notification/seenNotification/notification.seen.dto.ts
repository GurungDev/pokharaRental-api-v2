import { Expose, Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class NotificationSeenDto{
    @Expose()
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @IsNumber()
    notificationId: number;

}