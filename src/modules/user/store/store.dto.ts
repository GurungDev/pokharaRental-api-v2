import { Transform } from "class-transformer";
import { IsByteLength, IsNotEmpty, IsString } from "class-validator";

export class StoreUpdateDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    ownerName: string;

    @Transform(({ value }) => {
        return value && value.trim();
    })
    @IsString()
    @IsByteLength(10, 10)
    phoneNumber: string;
}