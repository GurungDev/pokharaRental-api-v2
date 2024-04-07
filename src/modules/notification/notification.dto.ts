import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested, isEnum } from "class-validator";
import { NotificationTypeEnum } from "../../common/enum/enums";
 export class NotificationMessageDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}


export class NotificationDataDto{
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  linkId: string;

  @IsNotEmpty()
  @IsEnum(NotificationTypeEnum)
  notificationFor: NotificationTypeEnum;
}

export class NotificationDto {
  @IsNotEmpty()
  @IsString()
  @ValidateNested()
  notification: NotificationMessageDto;

  @IsNotEmpty()
  @IsString()
  @ValidateNested()
  data: NotificationMessageDto;

}


