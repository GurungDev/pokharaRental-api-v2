import { Transform } from "class-transformer";
import { IsByteLength, IsNotEmpty, IsString } from "class-validator";

export class CustomerPatchDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;
 
    @Transform(({ value }) => {
        return value && value.trim();
    })
    @IsString()
    @IsByteLength(10, 10)
    phoneNumber: string;
}