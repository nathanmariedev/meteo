import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { NunjucksModule } from './nunjucks/nunjucks.module';
import { UserModule } from './user/user.module';
import { CityModule } from './city/city.module';
import { FavsModule } from './favs/favs.module';
import { AuthModule } from './auth/auth.module';
import { MeteoModule } from './meteo/meteo.module';

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
    DatabaseModule,
    NunjucksModule,
    UserModule,
    CityModule,
    FavsModule,
    AuthModule,
    MeteoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
