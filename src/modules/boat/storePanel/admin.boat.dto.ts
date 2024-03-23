import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, isNotEmpty, min } from "class-validator";
import { Multer } from "multer";

export class CreateBoatDto {
    @IsNotEmpty()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(1, { message: ' must be greater than zero' })
    capacity: number;

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

export class UpdateBoatDto {
    @IsNotEmpty()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(1, { message: ' must be greater than zero' })
    capacity: number;

    @IsNotEmpty()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(1, { message: ' must be greater than zero' })
    priceInRs: number;
    
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    title: string;
    
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    description: string;
}