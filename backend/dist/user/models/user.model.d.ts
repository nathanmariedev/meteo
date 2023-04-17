import { BasicCrudModel } from '../../common/models/basic-crud.model';
import { User } from '../classes/user.class';
import { Knex } from 'knex';
import { UserWithMainCity } from '../dto/user-with-main-city.dto';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class UserModel extends BasicCrudModel<User> {
    protected readonly pg: Knex;
    constructor(pg: Knex);
    findAll(): Promise<User[]>;
    findOneById(userId: string): Promise<UserWithMainCity>;
    addOne(user: CreateUserDto): Promise<CreateUserDto>;
}
