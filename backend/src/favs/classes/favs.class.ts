import { ApiProperty } from '@nestjs/swagger';
import { Length, MinLength } from 'class-validator';
import { Column } from 'typeorm';

export class Favs {
  @Length(5)
  @ApiProperty()
  @Column({ name: 'insee' })
  insee: string;

  @MinLength(1)
  @ApiProperty()
  @Column({ name: 'userName' })
  userName: string;
}
