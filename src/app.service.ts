import { resolve } from 'path';
import { readFileSync } from 'fs';
import { Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CronService } from './modules/cron/cron.service';

@Injectable()
export class AppService {
  private packageJson;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly cronService: CronService,
  ) {
    const packageJsonPath = resolve(__dirname, '../package.json');
    const packageData = readFileSync(packageJsonPath, 'utf8');
    this.packageJson = JSON.parse(packageData);
  }

  async Health() {
    const memoryUsage = process.memoryUsage();
    const uptime = process.uptime();

    const databaseStatus = {
      readable: false,
      writable: false,
    };

    try {
      await this.connection.db.admin().ping();
      databaseStatus.readable = true;

      await this.connection.collection('test').insertOne({ test: true });
      databaseStatus.writable = true;
    } catch (error) {
      console.error(error);
    }

    return {
      apiDetails: {
        name: this.packageJson.name,
        version: this.packageJson.version,
        uptime: `${Math.floor(uptime / 60)} minutes`,
      },
      databaseStatus,
      lastCronExecution: this.cronService.getLastExecution(),
      memoryUsage: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      },
    };
  }
}
