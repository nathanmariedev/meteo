import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { EmailModule } from './email/email.module';
import { NunjucksModule } from './nunjucks/nunjucks.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // env dev, sinon process.env
      envFilePath: 'config.env',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: configService.get('SMTP_CONNECTION_STRING'),
        defaults: {
          from: configService.get('SENDER_EMAIL'),
        },
      }),
    }),
    AuthModule,
    EmailModule,
    DatabaseModule,
    NunjucksModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
