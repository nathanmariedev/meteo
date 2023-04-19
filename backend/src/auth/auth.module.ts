import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CoreModule } from '../core/core.module';
import { DatabaseModule } from '../database/database.module';
import { NunjucksModule } from '../nunjucks/nunjucks.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessJwtStrategy } from './strategies/access.jwt.strategy';
import { ActivationJwtStrategy } from './strategies/activation.jwt.strategy';
import { ResetJwtStrategy } from './strategies/reset.jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_LOGIN_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_LOGIN_EXPIRES'),
        },
      }),
    }),
    NunjucksModule,
    DatabaseModule,
    CoreModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ActivationJwtStrategy, AccessJwtStrategy, ResetJwtStrategy],
})
export class AuthModule {}
