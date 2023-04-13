import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModel } from './models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CoreModule } from '../core/core.module';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule, CoreModule],
  providers: [UserModel, UserService],
  exports: [UserModel, UserService],
})
export class UserModule {}
