import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import {
  Product,
  ProductDocument,
  ProductSchema,
  ProductStatus,
} from '../entities/product.entity';
import { FindAllProductsDto } from '../dto/find-all-products.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

export interface FindAllProductsResponse {
  page: number;
  totalDocs: number;
  totalPages: number;
  docs: Product[];
}

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async inserMany(products: Product[]) {
    return await this.productModel.insertMany(products);
  }

  async findAll(
    findAllProductsDto: FindAllProductsDto,
  ): Promise<FindAllProductsResponse> {
    const { limit, page } = findAllProductsDto;

    const offset = limit * page - limit;

    const docs = await this.productModel
      .find({ status: { $ne: ProductStatus.TRASH } })
      .skip(offset)
      .limit(limit)
      .lean();

    const totalDocs = await this.productModel.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit);

    return {
      page,
      totalDocs,
      totalPages,
      docs,
    };
  }

  async findOne(code: number) {
    return this.productModel.findOne({ code }).lean();
  }

  async update(code: number, updateProductDto: UpdateProductDto) {
    return this.productModel.findOneAndUpdate(
      { code },
      { $set: updateProductDto },
      { new: true },
    );
  }

  async remove(code: number) {
    return await this.productModel.findOneAndUpdate(
      { code },
      { status: ProductStatus.TRASH },
    );
  }
}
