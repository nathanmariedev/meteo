import { IsEmail, MaxLength, IsBoolean, MinLength, IsUUID, IsDateString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @IsUUID()
  @ApiProperty()
  userId: string;

  @IsEmail()
  @MaxLength(42)
  @ApiProperty()
  email: string;

  @MinLength(8)
  @MaxLength(32)
  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  password: string;

  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

  @IsDateString()
  @ApiProperty({ type: 'string', format: 'date-time' })
  lastLoginAt: Date;

  @IsDateString()
  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  @IsDateString()
  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;

  @IsDateString()
  @ApiProperty({ type: 'string', format: 'date-time' })
  deletedAt: Date;
}
