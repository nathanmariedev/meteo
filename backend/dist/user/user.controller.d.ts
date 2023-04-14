import { User } from './classes/user.class';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findById(id: string): Promise<User>;
    add(userToAdd: User): Promise<User>;
}
