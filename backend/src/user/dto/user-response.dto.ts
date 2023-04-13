import { ApiProperty } from '@nestjs/swagger';
import { User } from '../classes/user.class';

export class UserResponse {
  @ApiProperty({ type: User })
  data: User;
}
