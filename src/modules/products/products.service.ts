import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './repository/product.repository';
import { FindAllProductsDto } from './dto/find-all-products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  insertMany(products) {
    return this.productRepository.inserMany(products);
  }

  findAll(findAllProductsDto: FindAllProductsDto) {
    return this.productRepository.findAll(findAllProductsDto);
  }

  findOne(code: number) {
    return this.productRepository.findOne(code)
  }

  update(code: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(code, updateProductDto)
  }

  remove(code: number) {
    return this.productRepository.remove(code);
  }
}
