import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: 'https://world.openfoodfacts.org/product/20221126',
  })
  url: String;

  @ApiProperty({ example: 'securita' })
  creator: String;
  @ApiProperty({ example: 'Madalenas quadradas' })
  product_name: String;

  @ApiProperty({ example: '380 g (6 x 2 u.)' })
  quantity: String;
  @ApiProperty({ example: 'La Cestera' })
  brands: String;
  @ApiProperty({
    example:
      'Lanches comida, Lanches doces, Biscoitos e Bolos, Bolos, Madalenas',
  })
  categories: String;
  @ApiProperty({
    example: 'Contem gluten, Contém derivados de ovos, Contém ovos',
  })
  labels: String;
  @ApiProperty({ example: ' ' })
  cities: String;
  @ApiProperty({ example: 'Braga,Portugal' })
  purchase_places: String;

  @ApiProperty({ example: 'Lidl' })
  stores: String;
  @ApiProperty({
    example:
      'farinha de trigo, açúcar, óleo vegetal de girassol, clara de ovo, ovo, humidificante (sorbitol), levedantes químicos (difosfato dissódico, hidrogenocarbonato de sódio), xarope de glucose-frutose, sal, aroma',
  })
  ingredients_text: String;
  @ApiProperty({
    example:
      'Frutos de casca rija,Leite,Soja,Sementes de sésamo,Produtos à base de sementes de sésamo',
  })
  traces: String;

  @ApiProperty({ example: 'madalena 31.7 g' })
  serving_size: String;
  @ApiProperty({ example: 31.7 })
  serving_quantity: Number;
  @ApiProperty({ example: 17 })
  nutriscore_score: Number;

  @ApiProperty({ example: 'd' })
  nutriscore_grade: String;

  @ApiProperty({ example: 'en:madeleines' })
  main_category: String;

  @ApiProperty({
    example:
      'https://static.openfoodfacts.org/images/products/20221126/front_pt.5.400.jpg',
  })
  image_url: String;
}
