"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const morgan = require("morgan");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const sentry_interceptor_1 = require("./sentry.interceptor");
const helmet = require('helmet');
async function bootstrap() {
    const expressInstance = express();
    expressInstance.use(Sentry.Handlers.requestHandler({
        user: ['sub', 'email', 'type', 'iss'],
        ip: true,
    }));
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
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressInstance));
    app.useGlobalInterceptors(new sentry_interceptor_1.SentryInterceptor());
    const configService = app.get(config_1.ConfigService);
    if (configService.get('NODE_ENV') !== 'production') {
        app.use(morgan((tokens, req, res) => {
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
        }));
    }
    const disableErrorMessages = configService.get('NODE_ENV') === 'production';
    app.useGlobalPipes(new common_1.ValidationPipe({
        disableErrorMessages,
        transform: true,
        whitelist: true,
    }));
    if (configService.get('NODE_ENV') === 'development') {
        app.enableCors();
    }
    app.use(helmet());
    const options = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('Meteo example')
        .setDescription('The meteo API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('doc', app, document);
    console.log('\x1b[31m%s\x1b[0m', `==============================================================`);
    console.log('\x1b[31m%s\x1b[0m', `============= >>> app started on port: ${configService.get('PORT')} <<<  =============`);
    console.log('\x1b[31m%s\x1b[0m', `==============================================================`);
    await app.listen(configService.get('PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map