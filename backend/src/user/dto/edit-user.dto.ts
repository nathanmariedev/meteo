import { PickType } from '@nestjs/swagger';
import { User } from '../classes/user.class';

export class EditUserDto extends PickType(User, ['userName', 'password']) {}
