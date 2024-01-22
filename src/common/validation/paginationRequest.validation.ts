import { Exclude, Expose, Type } from "class-transformer";
import { IsNumber, IsOptional, Max, Min } from "class-validator";

@Exclude()
export class PaginationRequest {
  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number;
}
