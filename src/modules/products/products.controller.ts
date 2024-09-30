import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllProductsDto } from './dto/find-all-products.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Get,
  Put,
  Body,
  Query,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  Controller,
  ValidationPipe,
} from '@nestjs/common';
import { GetProductsResponse } from './dto/find-all-products-response.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get all projects' })
  @ApiOkResponse({
    description: 'Return Paginated Products',
    type: GetProductsResponse,
  })
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() query: FindAllProductsDto) {
    return this.productsService.findAll(query);
  }

  @ApiOperation({ summary: 'Get one project by code' })
  @ApiOkResponse({
    description: 'The returned product.',
    type: Product,
  })
  @Get(':code')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('code') code: number) {
    return await this.productsService.findOne(code);
  }

  @ApiOperation({
    summary: 'Update one project by code',
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponse({
    description: 'The updated Product',
    type: Product,
  })
  @Put(':code')
  @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
  update(
    @Param('code') code: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(code, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete one project by code' })
  @Delete(':code')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  delete(@Param('code') code: number) {
    return this.productsService.remove(code);
  }
}
