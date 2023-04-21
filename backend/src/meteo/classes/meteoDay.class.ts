import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsNumber, Min, Max } from 'class-validator';
import { Column } from 'typeorm';

export class MeteoDay {
  insee: string;

  @ApiProperty()
  @IsInt()
  cp: number;

  @ApiProperty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(13)
  day: number;

  datetime: string;

  @ApiProperty()
  @IsInt()
  @Expose({ name: 'wind10m' })
  wind: number;

  @ApiProperty()
  @IsInt()
  gust10m: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(360)
  dirwind10m: number;

  @ApiProperty()
  @IsNumber()
  rr10: number;

  @ApiProperty()
  @IsNumber()
  rr1: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(100)
  probarain: number;

  @ApiProperty()
  @IsInt()
  weather: number;

  @ApiProperty()
  @IsInt()
  tmin: number;

  @ApiProperty()
  @IsInt()
  tmax: number;

  @ApiProperty()
  @IsInt()
  sunHours: number;

  @ApiProperty()
  @IsNumber()
  etp: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(100)
  probafrost: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(100)
  probafog: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(100)
  probawind70: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(100)
  probawind100: number;

  @ApiProperty()
  @IsInt()
  gustx: number;
}
