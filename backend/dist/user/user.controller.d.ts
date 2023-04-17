import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserWithMainCity } from './dto/user-with-main-city.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findById(id: string): Promise<UserWithMainCity>;
    add(userToAdd: CreateUserDto): Promise<CreateUserDto>;
}
