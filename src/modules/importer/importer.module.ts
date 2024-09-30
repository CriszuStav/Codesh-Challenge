import { Module } from '@nestjs/common';
import { ImporterService } from './importer.service';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { ImporterSchema } from './entities/importer.entity';
import { ProductsModule } from '../products/products.module';
import { ImporterRepository } from './repository/importer.repository';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: 'Importer',
        schema: ImporterSchema,
        collection: 'importer',
      },
    ]),
  ],
  providers: [ImporterService, ImporterRepository],
  exports: [ImporterService],
})
export class ImporterModule {}
