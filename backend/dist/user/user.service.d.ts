import { UserModel } from './models/user.model';
import { User } from './classes/user.class';
import { CityService } from './../city/city.service';
import { UserWithMainCity } from './dto/user-with-main-city.dto';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private readonly userModel;
    private readonly cityService;
    constructor(userModel: UserModel, cityService: CityService);
    findAll(): Promise<User[]>;
    findOneById(userId: string): Promise<UserWithMainCity>;
    add(user: CreateUserDto): Promise<CreateUserDto>;
}
