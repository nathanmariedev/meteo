import { ApiProperty } from '@nestjs/swagger';
import { Metadata } from '../../common/classes/metadata.class';
import { User } from '../classes/user.class';

export class UserListResponse {
  @ApiProperty({ type: User, isArray: true })
  data: User[];

  @ApiProperty({ type: Metadata })
  metadata: Metadata;
}
