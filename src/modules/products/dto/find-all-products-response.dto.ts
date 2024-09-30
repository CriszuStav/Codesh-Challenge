import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export class GetProductsResponse {
  @ApiProperty({  })
  docs: Product[];

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;
}
