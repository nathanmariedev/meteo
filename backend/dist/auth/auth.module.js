"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const core_module_1 = require("../core/core.module");
const database_module_1 = require("../database/database.module");
const email_module_1 = require("../email/email.module");
const nunjucks_module_1 = require("../nunjucks/nunjucks.module");
const user_module_1 = require("../user/user.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const access_jwt_strategy_1 = require("./strategies/access.jwt.strategy");
const activation_jwt_strategy_1 = require("./strategies/activation.jwt.strategy");
const reset_jwt_strategy_1 = require("./strategies/reset.jwt.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_LOGIN_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_LOGIN_EXPIRES'),
                    },
                }),
            }),
            nunjucks_module_1.NunjucksModule,
            database_module_1.DatabaseModule,
            email_module_1.EmailModule,
            core_module_1.CoreModule,
            user_module_1.UserModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, activation_jwt_strategy_1.ActivationJwtStrategy, access_jwt_strategy_1.AccessJwtStrategy, reset_jwt_strategy_1.ResetJwtStrategy],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map