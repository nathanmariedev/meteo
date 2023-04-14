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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const pbkdf2 = require("crypto");
const bcrypt_service_1 = require("../core/crypto/bcrypt.service");
const email_service_1 = require("../email/email.service");
const mail_type_enum_1 = require("../email/enums/mail-type.enum");
const user_model_1 = require("../user/models/user.model");
let AuthService = class AuthService {
    constructor(userModel, jwtService, emailService, cryptoService, configService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.cryptoService = cryptoService;
        this.configService = configService;
    }
    async login(email, password) {
        const user = await this.userModel.findOne({
            email,
            isActive: true,
        });
        if (!user)
            return false;
        const match = await this.cryptoService.compare(password, user.password);
        if (!match)
            return false;
        await this.userModel.update({ lastLoginAt: new Date() }, { userId: user.userId });
        return user;
    }
    async generateJWTToken(user, options) {
        const payload = Object.assign({ iss: 'api.meteo', email: user.email, sub: user.userId, type: 'access' }, options);
        const signedToken = await this.jwtService.sign(payload);
        return signedToken;
    }
    async generateActivationLink(user) {
        const payload = {
            iss: 'api.meteo',
            email: user.email,
            sub: user.userId,
            type: 'activation',
        };
        const options = {
            expiresIn: '6h',
        };
        const signedToken = await this.jwtService.sign(payload, options);
        const clientBaseUrl = this.configService.get('CLIENT_BASE_URL');
        const url = `${clientBaseUrl}/activate-account?token=${signedToken}`;
        return url;
    }
    async generateResetPasswordLink(user) {
        const jwtLoginSecret = this.configService.get('JWT_LOGIN_SECRET');
        const payload = {
            iss: 'api.meteo',
            email: user.email,
            sub: user.userId,
            type: 'reset',
            nonce: pbkdf2.pbkdf2Sync(user.password, jwtLoginSecret, 1, 32, 'sha512').toString('hex'),
        };
        const options = {
            expiresIn: '3h',
        };
        const signedToken = await this.jwtService.sign(payload, options);
        const clientBaseUrl = this.configService.get('CLIENT_BASE_URL');
        const url = `${clientBaseUrl}/auth/password/new?token=${signedToken}`;
        return url;
    }
    async register(data) {
        try {
            const user = await this.userModel.create({
                email: data.email,
                isActive: false,
                password: await this.cryptoService.hash(data.password),
            });
            user.password = null;
            await this.emailService.sendEmail(mail_type_enum_1.MailType.REGISTER, {
                to: user.email,
                context: {
                    activationLink: await this.generateActivationLink(user),
                },
            });
            return user;
        }
        catch (error) {
            if (error.routine === '_bt_check_unique') {
                throw new common_1.NotAcceptableException('Email already in use');
            }
            else {
                throw error;
            }
        }
    }
    async activate(userId) {
        const user = await this.userModel.update({ isActive: true }, { userId, isActive: false });
        return user[0];
    }
    async resetPassword(email) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            return false;
        await this.emailService.sendEmail(mail_type_enum_1.MailType.RESET, {
            to: user.email,
            context: {
                resetPasswordLink: await this.generateResetPasswordLink(user),
            },
        });
        return true;
    }
    async setNewPassword(decodedPayload, newPassword) {
        const user = await this.userModel.findOne({
            email: decodedPayload.email,
            userId: decodedPayload.sub,
            isActive: true,
        });
        const jwtLoginSecret = this.configService.get('JWT_LOGIN_SECRET');
        const currentNonce = pbkdf2
            .pbkdf2Sync(user.password, jwtLoginSecret, 1, 32, 'sha512')
            .toString('hex');
        if (currentNonce !== decodedPayload.nonce) {
            throw new common_1.ForbiddenException('Invalid token (nonce)');
        }
        const updatedUser = await this.userModel.update({ password: await this.cryptoService.hash(newPassword) }, {
            userId: user.userId,
        });
        updatedUser[0].password = null;
        return updatedUser[0];
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_model_1.UserModel,
        jwt_1.JwtService,
        email_service_1.EmailService,
        bcrypt_service_1.BCryptService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map