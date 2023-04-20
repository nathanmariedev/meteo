import { PickType } from '@nestjs/swagger';
import { User } from '../../user/classes/user.class';

export class ResetPasswordDto extends PickType(User, ['userName']) {}
