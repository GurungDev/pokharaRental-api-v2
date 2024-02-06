import { Expose, Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class SubscriberDto{
    @Expose()
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @IsNumber()
    storeId: number;
}