import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsDateString, Min, Max } from 'class-validator';

export class MeteoHour {
  @ApiProperty()
  @IsString()
  insee: string;

  @ApiProperty()
  @IsNumber()
  cp: number;

  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  longitude: number;

  @ApiProperty()
  @IsDateString()
  datetime: string;

  @ApiProperty()
  @IsNumber()
  temp2m: number;

  @ApiProperty()
  @IsNumber()
  rh2m: number;

  @ApiProperty()
  @IsNumber()
  wind10m: number;

  @ApiProperty()
  @IsNumber()
  gust10m: number;

  @ApiProperty()
  @IsNumber()
  dirwind10m: number;

  @ApiProperty()
  @IsNumber()
  rr10: number;

  @ApiProperty()
  @IsNumber()
  rr1: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  probarain: number;

  @ApiProperty()
  @IsNumber()
  weather: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  probafrost: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  probafog: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  probawind70: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(100)
  probawind100: number;

  @ApiProperty()
  @IsNumber()
  tsoil1: number;

  @ApiProperty()
  @IsNumber()
  tsoil2: number;

  @ApiProperty()
  @IsNumber()
  gustx: number;

  @ApiProperty()
  @IsNumber()
  iso0: number;
}
