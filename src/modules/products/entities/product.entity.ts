import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';

export type ProductDocument = HydratedDocument<Product>;

export enum ProductStatus {
  DRAFT = 'draft',
  TRASH = 'trash',
  PUBLISHED = 'published',
}

@Schema()
export class Product {
  @ApiProperty({ example: 20221126 })
  @Prop()
  code: number;

  @ApiProperty({ example: 'published' })
  @Prop({ enum: ProductStatus })
  status: ProductStatus;

  @ApiProperty({ example: '2020-02-07T16:00:00Z' })
  @Prop({ default: Date.now })
  imported_t: Date;

  @ApiProperty({
    example: 'https://world.openfoodfacts.org/product/20221126',
  })
  @Prop()
  url: String;

  @ApiProperty({ example: 'securita' })
  @Prop()
  creator: String;

  @ApiProperty({ example: 1415302075 })
  @Prop()
  created_t: number;

  @ApiProperty({ example: 1572265837 })
  @Prop()
  last_modified_t: number;

  @ApiProperty({ example: 'Madalenas quadradas' })
  @Prop()
  product_name: String;

  @ApiProperty({ example: '380 g (6 x 2 u.)' })
  @Prop()
  quantity: String;

  @ApiProperty({ example: 'La Cestera' })
  @Prop()
  brands: String;

  @ApiProperty({
    example:
      'Lanches comida, Lanches doces, Biscoitos e Bolos, Bolos, Madalenas',
  })
  @Prop()
  categories: String;

  @ApiProperty({
    example: 'Contem gluten, Contém derivados de ovos, Contém ovos',
  })
  @Prop()
  labels: String;

  @ApiProperty({ example: ' ' })
  @Prop()
  cities: String;

  @ApiProperty({ example: 'Braga,Portugal' })
  @Prop()
  purchase_places: String;

  @ApiProperty({ example: 'Lidl' })
  @Prop()
  stores: String;

  @ApiProperty({
    example:
      'farinha de trigo, açúcar, óleo vegetal de girassol, clara de ovo, ovo, humidificante (sorbitol), levedantes químicos (difosfato dissódico, hidrogenocarbonato de sódio), xarope de glucose-frutose, sal, aroma',
  })
  @Prop()
  ingredients_text: String;

  @ApiProperty({
    example:
      'Frutos de casca rija,Leite,Soja,Sementes de sésamo,Produtos à base de sementes de sésamo',
  })
  @Prop()
  traces: String;

  @ApiProperty({ example: 'madalena 31.7 g' })
  @Prop()
  serving_size: String;

  @ApiProperty({ example: 31.7 })
  @Prop()
  serving_quantity: Number;

  @ApiProperty({ example: 17 })
  @Prop()
  nutriscore_score: Number;

  @ApiProperty({ example: 'd' })
  @Prop()
  nutriscore_grade: String;

  @ApiProperty({ example: 'en:madeleines' })
  @Prop()
  main_category: String;

  @ApiProperty({
    example:
      'https://static.openfoodfacts.org/images/products/20221126/front_pt.5.400.jpg',
  })
  @Prop()
  image_url: String;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
