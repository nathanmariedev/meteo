import { PickType } from '@nestjs/swagger';
import { User } from '../../user/classes/user.class';

export class LoginDto extends PickType(User, ['email', 'password']) {}
