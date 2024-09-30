import * as request from 'supertest';
import { Model, Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { ProductsModule } from './products.module';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

describe('Product Controller Tests', () => {
  let app: INestApplication;
  let productService = {
    findOne: (code: number) => ({
      _id: new Types.ObjectId(),
      code,
      name: 'Produto Teste',
    }),
    update: (code: number, updateData: any) => ({
      _id: new Types.ObjectId(),
      code,
      ...updateData,
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule],
    })
      .overrideProvider(getModelToken(Product.name))
      .useValue(Model)
      .overrideProvider(ProductsService)
      .useValue(productService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET product/:code', async () => {
    const code = 112244;
    const response = await request(app.getHttpServer())
      .get(`/products/${code}`)
      .expect(200);

    expect(response.body).toEqual({
      _id: expect.any(String),
      code,
      name: 'Produto Teste',
    });
  });

  it('/PUT product/:code', async () => {
    const code = 112244;
    const data = { name: 'Novo Produto' };

    const response = await request(app.getHttpServer())
      .put(`/products/${code}`)
      .send(data)
      .expect(200);

    expect(response.body).toEqual({
      _id: expect.any(String),
      code,
      name: 'Novo Produto',
    });
  });
});