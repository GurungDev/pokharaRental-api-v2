
import { Transform } from 'class-transformer';
import { IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateIf } from 'class-validator';
import { PaymentType, ProductEnum, SortEnum } from '../../common/enum/enums';

export class BuyNowDto {
    @IsNotEmpty({ message: 'Quantity is required' })
    @IsNumber({}, { message: 'Quantity must be a number' })
    @Min(1, { message: 'Quantity must be at least 1' })
    @Max(5, { message: 'Quantity cannot be greater than 5' })
    quantity: number;

 
    @IsNotEmpty()
    @IsString()
    transaction_uuid: string;

    @IsNotEmpty({ message: 'Booking date is required' })
    @IsISO8601({ strict: false })
    bookingDate: Date;

    @IsNotEmpty({ message: 'Duration in hours is required' })
    @IsNumber({}, { message: 'Duration in hours must be a number' })
    @Min(1, { message: 'Duration must be at least 1' })
    durationInHour: number;


    @IsNotEmpty({ message: 'issuedFor is required' })
    @IsEnum(ProductEnum)
    issuedFor: ProductEnum;

    @IsNotEmpty({ message: 'Issue ID is required' })
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber({}, { message: 'Issue ID must be a number' })
    issueId: number;

    @IsNotEmpty()
    @IsEnum(PaymentType)
    paymentMethod: PaymentType;

    @ValidateIf(values => values.paymentMethod == PaymentType.ESEWA)
    @IsNotEmpty()
    @IsString()
    token: string;
}



export class BuyNowEsewaDto {

    @ValidateIf(values => values.paymentMethod == PaymentType.ESEWA)
    @IsNotEmpty()
    @IsString()
    token: string;
}

export class OrderDto {

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(SortEnum)
    orderBy: SortEnum;
}
