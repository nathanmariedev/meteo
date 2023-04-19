import { Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { UserWithMainCity } from './dto/user-with-main-city.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userModel: UserModel) {}

  async findOneByName(userName: string): Promise<UserWithMainCity> {
    return this.userModel.findOneByName(userName);
  }

  async add(user: CreateUserDto): Promise<CreateUserDto> {
    return this.userModel.addOne(user);
  }
}
