import * as express from 'express';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SentryInterceptor } from './sentry.interceptor';

// Fix temporaire
// eslint-disable-next-line @typescript-eslint/no-var-requires
const helmet = require('helmet');

async function bootstrap(): Promise<void> {
  const expressInstance = express();

  expressInstance.use(
    Sentry.Handlers.requestHandler({
      user: ['sub', 'email', 'type', 'iss'],
      ip: true,
    }),
  );
  expressInstance.use(Sentry.Handlers.tracingHandler());

  Sentry.init({
    release: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express(),
      new Tracing.Integrations.Postgres(),
    ],
    tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE),
  });

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.useGlobalInterceptors(new SentryInterceptor());

  const configService = app.get(ConfigService);

  if (configService.get('NODE_ENV') !== 'production') {
    app.use(
      morgan((tokens: any, req: Request, res: Response) => {
        const log = [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'),
          '-',
          tokens['response-time'](req, res),
          'ms',
        ];

        if (tokens['response-time'](req, res) > 150) {
          log.push(' <---- SLOW REQUEST !!!');
        }

        return log.join(' ');
      }),
    );
  }

  const disableErrorMessages = configService.get('NODE_ENV') === 'production';
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages,
      transform: true,
      whitelist: true,
    }),
  );

  // A ajouter s'il y a des problèmes de CORS avec un front
  if (configService.get('NODE_ENV') === 'development') {
    app.enableCors();
  }

  app.use(helmet());

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Meteo example')
    .setDescription('The meteo API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  console.log(
    '\x1b[31m%s\x1b[0m',
    `==============================================================`,
  );
  console.log(
    '\x1b[31m%s\x1b[0m',
    `============= >>> app started on port: ${configService.get('PORT')} <<<  =============`,
  );
  console.log(
    '\x1b[31m%s\x1b[0m',
    `==============================================================`,
  );
  await app.listen(configService.get('PORT'));
}

bootstrap();
