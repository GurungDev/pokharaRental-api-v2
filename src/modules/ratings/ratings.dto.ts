import { IsByteLength, IsEnum, IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { RatingForEnum } from "../../common/enum/enums";
import { Transform } from "class-transformer";

export class RateDto{
    @IsNotEmpty()
    @IsNumber({})
    @Min(1)
    @Max(5)
    @Transform(({ value }) => value && Number(value))
    star: number;  

    @IsNotEmpty()
    @IsEnum(RatingForEnum)
    ratingFor: RatingForEnum;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value && Number(value))
    issueId: number; 
 
}

export class RequestRatingDto{
 

    @IsNotEmpty()
    @IsEnum(RatingForEnum)
    ratingFor: RatingForEnum;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value && Number(value))
    issueId: number; 
 
}


export class RequestTopRatingDto{
 

    @IsNotEmpty()
    @IsEnum(RatingForEnum)
    ratingFor: RatingForEnum;

 
 
}