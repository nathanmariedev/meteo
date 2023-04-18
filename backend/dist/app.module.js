"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const database_module_1 = require("./database/database.module");
const nunjucks_module_1 = require("./nunjucks/nunjucks.module");
const user_module_1 = require("./user/user.module");
const city_module_1 = require("./city/city.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: 'config.env',
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    transport: configService.get('SMTP_CONNECTION_STRING'),
                    defaults: {
                        from: configService.get('SENDER_EMAIL'),
                    },
                }),
            }),
            database_module_1.DatabaseModule,
            nunjucks_module_1.NunjucksModule,
            user_module_1.UserModule,
            city_module_1.CityModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map