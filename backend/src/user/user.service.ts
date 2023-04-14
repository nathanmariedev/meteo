import { Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { User } from './classes/user.class';
import { Search } from './../common/classes/search.class';
import { BCryptService } from '../core/crypto/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userModel: UserModel,
  ) {}

  async findAll():Promise<User[]>{
    return this.userModel.findAll()
  }

  async findOneById(userId: string): Promise<User> {
    return this.userModel.findOneById( userId );
  }

  async add(user:User):Promise<User>{
    return this.userModel.create(user)
  }

}
