import { MongoClient } from 'mongodb';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './config/database.config';
import { Global, Module, Scope } from '@nestjs/common';
import { CronModule } from './modules/cron/cron.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { ImporterModule } from './modules/importer/importer.module';

@Global()
@Module({
  imports: [
    CronModule,
    ProductsModule,
    ImporterModule,
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.host'),
        dbName: configService.get<string>('database.dbName'),
        user: configService.get<string>('database.user'),
        pass: configService.get<string>('database.pass'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
