import { PickType } from '@nestjs/swagger';
import { User } from '../classes/user.class';

export class CreateUserDto extends PickType(User, ['userName', 'password', 'mainCity']) {}
