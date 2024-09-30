import { Transform } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class FindAllProductsDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @ApiPropertyOptional({
    default: 10,
  })
  @IsOptional()
  limit: number = 10;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @ApiPropertyOptional({
    default: 1,
  })
  @IsOptional()
  page: number = 1;
}