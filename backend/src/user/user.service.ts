import { Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { User } from './classes/user.class';
import { Search } from './../common/classes/search.class';
import { BCryptService } from '../core/crypto/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userModel: UserModel,
    private readonly bcryptService: BCryptService,
  ) {}

  async count(where: Partial<User>, search?: string): Promise<number> {
    let searchObject;
    if (search) searchObject = new Search(['user_id', 'email'], search);

    return this.userModel.count(where, searchObject);
  }

  async find(
    where: Partial<User>,
    order?: string,
    limit?: number,
    offset?: number,
    search?: string,
  ): Promise<User[]> {
    let searchObject;
    if (search) searchObject = new Search(['user_id', 'email'], search);

    return this.userModel.find(where, order, limit, offset, searchObject);
  }

  async findOneById(userId: string): Promise<User> {
    return this.userModel.findOne({ userId });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async create(data: Partial<User>): Promise<User> {
    data.password = await this.bcryptService.hash(data.password);
    return this.userModel.create(data);
  }

  async updateOneById(data: Partial<User>, userId: string): Promise<User> {
    const user = await this.userModel.update(data, { userId });

    return user[0];
  }

  async deleteOneById(userId: string): Promise<User> {
    const user = await this.userModel.delete({ userId });

    return user[0];
  }
}
