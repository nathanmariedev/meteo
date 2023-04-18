import { MaxLength, MinLength, Length, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: 'number', format: 'uuid' })
  @IsNumber()
  @Column({ name: 'userId' })
  userId: number;

  @MaxLength(42)
  @ApiProperty({ type: 'string' })
  @IsString()
  @Column({ name: 'userName' })
  userName: string;

  @MinLength(8)
  @MaxLength(32)
  @ApiProperty({ type: 'string' })
  @IsString()
  @Column({ name: 'password' })
  password: string;

  @Length(5)
  @ApiProperty({ type: 'string' })
  @IsString()
  @Column({ name: 'mainCity' })
  mainCity: string;
}
