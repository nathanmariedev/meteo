import { PickType } from '@nestjs/swagger';
import { User } from '../../user/classes/user.class';

export class RegisterDto extends PickType(User, ['email', 'password']) {}
