import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { RatingForEnum } from "../../../common/enum/enums";
import { Transform } from "class-transformer";

export class CreateHighLight{
    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsEnum(RatingForEnum)
    highlightFor: RatingForEnum;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value && Number(value))
    issueId: number; 
}


export class DeleteHighLight{

    @IsNotEmpty()
    @IsEnum(RatingForEnum)
    highlightFor: RatingForEnum;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value && Number(value))
    issueId: number; 
}

