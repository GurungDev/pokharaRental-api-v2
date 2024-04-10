import { Expose, Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class SalesAnalysisDTO {

    @Expose()
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @IsNumber()
    month: number;
    
    @Expose()
    @Transform(({ value }) => Number(value))
    @IsNotEmpty()
    @IsNumber()
    year: number;
}