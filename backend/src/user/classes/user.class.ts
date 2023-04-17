import {
  IsEmail,
  MaxLength,
  IsBoolean,
  MinLength,
  IsUUID,
  IsDateString,
  Length,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { City } from './../../city/classes/city.class';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @Column({ name: 'userId' })
  userId: number;

  @MaxLength(42)
  @ApiProperty()
  @Column({ name: 'userName' })
  userName: string;

  @MinLength(8)
  @MaxLength(32)
  @ApiProperty()
  @Column({ name: 'password' })
  password: string;

  @Length(5)
  @ApiProperty()
  @Column({ name: 'mainCity' })
  mainCity: string;
}
