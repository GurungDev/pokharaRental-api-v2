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
export class CustomerContactDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;
 
    @Transform(({ value }) => {
        return value && value.trim();
    })
    @IsString()
    @IsByteLength(10, 10)
    phone: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}