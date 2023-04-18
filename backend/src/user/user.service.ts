import { Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { User } from './classes/user.class';
import { CityService } from './../city/city.service';
import { UserWithMainCity } from './dto/user-with-main-city.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userModel: UserModel, private readonly cityService: CityService) {}

  async findOneById(userId: number): Promise<UserWithMainCity> {
    return this.userModel.findOneById(userId);
  }

  async add(user: CreateUserDto): Promise<CreateUserDto> {
    return this.userModel.addOne(user);
  }
}
