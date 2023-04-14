import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CityModel } from './models/city.model';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CoreModule } from '../core/core.module';

@Module({
  controllers: [CityController],
  imports: [DatabaseModule, CoreModule],
  providers: [CityModel, CityService],
  exports: [CityModel, CityService],
})
export class CityModule {}
