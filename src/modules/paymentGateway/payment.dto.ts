import { Expose, Transform, Type, plainToClass, plainToInstance } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested, ValidationOptions, registerDecorator, ValidationArguments, Equals, IsArray, ArrayNotEmpty, IsUrl, IsInt, Min, IsEnum, IsISO8601 } from "class-validator";
import { ProductEnum } from "../../common/enum/enums";



export class EsewaPayloadDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  token: string;
}





// for single product
export class EsewaInitSinglePayloadDto {

  @Expose()
  @IsNotEmpty()
  @IsString()
  transaction_uuid: string;


  @IsNotEmpty({ message: 'Booking date is required' })
  @IsISO8601({ strict: false })
  bookingDate: Date;


  @Expose()
  @IsNotEmpty()
  @IsString()
  product_code: string;

  @Expose()

  @IsNotEmpty({ message: 'Issue ID is required' })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber({}, { message: 'Issue ID must be a number' })

  productId: number

  @Expose()
  @IsNotEmpty()
  @IsEnum(ProductEnum)
  issuedFor: ProductEnum

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  duration: number

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  quantity: number
}


