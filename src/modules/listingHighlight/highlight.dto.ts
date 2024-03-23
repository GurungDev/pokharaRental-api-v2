import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { RatingForEnum } from "../../common/enum/enums";
import { Transform } from "class-transformer";

export class RequestHighLightDto {
    @IsNotEmpty()
    @IsEnum(RatingForEnum)
    highlightFor: RatingForEnum;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => value && Number(value))
    issueId: number;

}