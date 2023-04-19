import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TokenDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly token: string;
}
