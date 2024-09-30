import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductsModule } from '../products/products.module';
import { ImporterModule } from '../importer/importer.module';

@Module({
  imports: [ScheduleModule.forRoot(), ProductsModule, ImporterModule],
  providers: [CronService],
  exports: [CronService]
})
export class CronModule {}
