import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, isNotEmpty } from "class-validator";

export class LocationDto {
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @IsNumber()
    lat: number;

    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @IsNumber()
    long: number;
}