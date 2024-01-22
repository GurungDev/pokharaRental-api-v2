import { IsBoolean, IsNotEmpty } from "class-validator";

export class ValidateBoolean {
    @IsNotEmpty()
    @IsBoolean()
    value: boolean;
  }
  