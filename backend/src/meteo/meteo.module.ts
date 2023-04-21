import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CoreModule } from '../core/core.module';
import { MeteoModel } from './models/meteo.model';
import { MeteoService } from './meteo.service';
import { MeteoController } from './meteo.controller';

@Module({
  controllers: [MeteoController],
  imports: [DatabaseModule, CoreModule],
  providers: [MeteoModel, MeteoService],
  exports: [MeteoModel, MeteoService],
})
export class MeteoModule {}
