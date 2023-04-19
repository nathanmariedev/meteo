import { ApiProperty } from '@nestjs/swagger';
import { Length, MinLength } from 'class-validator';
import { Column } from 'typeorm';

export class Favs {
  constructor(favs: { insee: string; userName: string }) {
    this.insee = favs.insee;
    this.userName = favs.userName;
  }
  @Length(5)
  @ApiProperty()
  @Column({ name: 'insee' })
  insee: string;

  @MinLength(1)
  @ApiProperty()
  @Column({ name: 'userName' })
  userName: string;
}
