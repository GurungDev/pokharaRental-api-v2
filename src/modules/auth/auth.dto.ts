import { Transform } from "class-transformer";
import { IsByteLength, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { OtpPurpose, UserEnum } from "../../common/enum/enums";

export class StoreRegisterDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    long: string;
    
    @IsNotEmpty()
    @IsString()
    otp: string;

    @IsNotEmpty()
    @IsString()
    lat: string;
    
    @IsNotEmpty()
    @IsString()
    email: string;

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



export class StoreDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  long: string;
 

  @IsNotEmpty()
  @IsString()
  lat: string;
  
  @IsNotEmpty()
  @IsString()
  email: string;

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


export class CustomerRegisterDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;

 
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    otp: string;
 

    @Transform(({ value }) => {
        return value && value.trim();
      })
 
      @IsString()
    @IsByteLength(10, 10)
    phoneNumber: string;
}

export class LoginDto{
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(UserEnum)
    validateFor: UserEnum;
}


export class OtpDto{
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsEnum(OtpPurpose)
  purpose: OtpPurpose
}