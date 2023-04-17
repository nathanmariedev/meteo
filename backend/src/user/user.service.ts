import { Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { User } from './classes/user.class';
import { Search } from './../common/classes/search.class';
import { BCryptService } from '../core/crypto/bcrypt.service';
import { CityService } from './../city/city.service';
import { UserWithMainCity } from './dto/user-with-main-city.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userModel: UserModel, private readonly cityService: CityService) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOneById(userId: string): Promise<UserWithMainCity> {
    const user = this.userModel.findOneById(userId);
    return user;
  }

  async add(user: CreateUserDto): Promise<CreateUserDto> {
    return this.userModel.addOne(user);
  }
}
