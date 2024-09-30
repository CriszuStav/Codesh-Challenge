import { Cron } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { ImporterService } from '../importer/importer.service';

@Injectable()
export class CronService {
  lastExecution: Date | null = null;

  constructor(private readonly importerService: ImporterService) {}

  @Cron('0 3 * * *')
  async executeCron() {
    console.log('=== START === ');
    await this.importerService.main();
    this.lastExecution = new Date();
    console.log('=== FINISH === ');
  }

  getLastExecution(): Date | null {
    return this.lastExecution;
  }
}
