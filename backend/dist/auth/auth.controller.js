"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const user_class_1 = require("../user/classes/user.class");
const auth_service_1 = require("./auth.service");
const request_user_decorator_1 = require("./decorators/request-user.decorator");
const login_dto_1 = require("./dto/login.dto");
const new_password_dto_1 = require("./dto/new-password.dto");
const register_dto_1 = require("./dto/register.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const token_dto_1 = require("./dto/token.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async loginAction(body) {
        const user = await this.authService.login(body.email, body.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Wrong username/password combination');
        }
        const token = await this.authService.generateJWTToken(user);
        return {
            token,
        };
    }
    async registerAction(body) {
        await this.authService.register(body);
        return;
    }
    async confirmRegisterAction(userId) {
        const user = await this.authService.activate(userId);
        if (!user) {
            throw new common_1.BadRequestException('Account already active');
        }
        return;
    }
    async sendResetPasswordLinkAction(body) {
        await this.authService.resetPassword(body.email);
        return;
    }
    async setNewPasswordAction(payload, body) {
        const user = await this.authService.setNewPassword(payload, body.password);
        return user;
    }
};
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOkResponse)({ description: 'Successful login', type: token_dto_1.TokenDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Wrong username/password combination',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginAction", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successful register' }),
    (0, swagger_1.ApiNotAcceptableResponse)({ description: 'Email already in use' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAction", null);
__decorate([
    (0, common_1.Post)('register/activate'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('activation')),
    (0, swagger_1.ApiQuery)({
        name: 'token',
        description: 'Activation token',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Account activation successful' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Link is not valid' }),
    __param(0, (0, request_user_decorator_1.RequestUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmRegisterAction", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(202),
    (0, swagger_1.ApiAcceptedResponse)({ description: 'You might receive an email' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendResetPasswordLinkAction", null);
__decorate([
    (0, common_1.Post)('reset-password/new'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('reset')),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiQuery)({
        name: 'token',
        description: 'Reset password token',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Password successfully changed', type: user_class_1.User }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Link is not valid' }),
    __param(0, (0, request_user_decorator_1.RequestUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, new_password_dto_1.NewPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setNewPasswordAction", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Auth'),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request' }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map