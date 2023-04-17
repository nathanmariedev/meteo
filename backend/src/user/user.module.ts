import { HttpService, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModel } from './models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CoreModule } from '../core/core.module';
import { CityModel } from './../city/models/city.model';
import { CityService } from './../city/city.service';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule, CoreModule],
  providers: [UserModel, UserService, CityService, CityModel],
  exports: [UserModel, UserService],
})
export class UserModule {}
