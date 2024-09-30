import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get API infos' })
  @ApiResponse({
    status: 200,
    description: 'API informations',
    // type: ApiHealthResponse,
    // example: {
    //   apiDetails: {
    //     name: 'project-name',
    //     version: '0.0.1',
    //     uptime: `10 minutes`,
    //   },
    //   databaseStatus: {
    //     readable: false,
    //     writable: false,
    //    },
    //   lastCronExecution: this.cronService.getLastExecution(),
    //   memoryUsage: {
    //     rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
    //     heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
    //     heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
    //   },
    // }
  })
  @Get()
  async Health() {
    return this.appService.Health();
  }
}
