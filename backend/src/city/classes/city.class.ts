import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class City {
  constructor(city: { insee: string; cp: string; name: string }) {
    this.insee = city.insee;
    this.cp = city.cp;
    this.name = city.name;
  }
  @Length(5)
  @IsString()
  @ApiProperty({ type: 'string' })
  insee: string;

  @Length(5)
  @IsString()
  @ApiProperty({ type: 'string' })
  cp: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  name: string;
}
