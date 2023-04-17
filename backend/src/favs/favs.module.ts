import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CoreModule } from '../core/core.module';
import { FavsModel } from './models/favs.model';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';

@Module({
  controllers: [FavsController],
  imports: [DatabaseModule, CoreModule],
  providers: [FavsModel, FavsService],
  exports: [FavsModel, FavsService],
})
export class FavsModule {}
