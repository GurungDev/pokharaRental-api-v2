import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min, isNotEmpty, min } from "class-validator";

export class CreateCycleDto {
 

    @IsNotEmpty()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(1, { message: ' must be greater than zero' })
    priceInRs: number;
    
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsNotEmpty()
    @IsString()
    description: string;

}