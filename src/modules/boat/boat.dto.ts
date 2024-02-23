import { Transform, Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { SortByProductEnum, SortEnum } from "../../common/enum/enums";

export class GetBoatDto{
    
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value && Number(value))
    storeId: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsEnum(SortByProductEnum)
    sortBy: SortByProductEnum;

    @IsOptional()
    @IsEnum(SortEnum)
    order: SortEnum;
}