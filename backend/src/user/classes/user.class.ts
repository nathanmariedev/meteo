import { IsEmail, MaxLength, IsBoolean, MinLength, IsUUID, IsDateString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { City } from './../../city/classes/city.class';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'user'})
export class User {
  
  @PrimaryGeneratedColumn()
  @IsUUID()
  @ApiProperty()
  @Column({ name: 'userId' })
  userId: number;

  @IsEmail()
  @MaxLength(42)
  @ApiProperty()
  @Column({ name: 'userName' })
  userName: string;

  @MinLength(8)
  @MaxLength(32)
  @ApiProperty()
  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'mainCity' })
  mainCity:string;
}
