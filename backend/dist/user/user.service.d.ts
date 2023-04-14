import { UserModel } from './models/user.model';
import { User } from './classes/user.class';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: UserModel);
    findAll(): Promise<User[]>;
    findOneById(userId: string): Promise<User>;
    add(user: User): Promise<User>;
}
