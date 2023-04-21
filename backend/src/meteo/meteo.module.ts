import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CoreModule } from '../core/core.module';
import { MeteoService } from './meteo.service';
import { MeteoController } from './meteo.controller';

@Module({
  controllers: [MeteoController],
  imports: [DatabaseModule, CoreModule],
  providers: [MeteoService],
  exports: [MeteoService],
})
export class MeteoModule {}
