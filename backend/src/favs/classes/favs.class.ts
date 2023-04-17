import { ApiProperty } from '@nestjs/swagger';
import { Length, MinLength } from 'class-validator';
import { Column } from 'typeorm';

export class Favs {
  constructor(favs: { insee: string; userId: number }) {
    this.insee = favs.insee;
    this.userId = favs.userId;
  }
  @Length(5)
  @ApiProperty()
  @Column({ name: 'insee' })
  insee: string;

  @MinLength(1)
  @ApiProperty()
  @Column({ name: 'userId' })
  userId: number;
}
