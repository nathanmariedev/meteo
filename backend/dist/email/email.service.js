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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const Nunjucks = require("nunjucks");
const nunjucks_constants_1 = require("../nunjucks/nunjucks.constants");
const mail_type_enum_1 = require("./enums/mail-type.enum");
let EmailService = class EmailService {
    constructor(mailerService, nunjucks) {
        this.mailerService = mailerService;
        this.nunjucks = nunjucks;
    }
    async sendEmail(type, options) {
        if (!options.html) {
            options.html = await this.generateEmailHtml(type, options.context);
        }
        if (!options.subject && type === mail_type_enum_1.MailType.REGISTER) {
            options.subject = 'Finish your register and activate your account';
        }
        else if (!options.subject && type === mail_type_enum_1.MailType.RESET) {
            options.subject = 'Reset your account password';
        }
        const result = await this.mailerService.sendMail(Object.assign({}, options));
        return result;
    }
    async generateEmailHtml(type, context) {
        let html;
        if (type === mail_type_enum_1.MailType.RESET) {
            html = await this.nunjucks.render('email/reset.njk', context);
        }
        else if (type === mail_type_enum_1.MailType.REGISTER) {
            html = await this.nunjucks.render('email/register.njk', context);
        }
        return html;
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(nunjucks_constants_1.NUNJUCKS)),
    __metadata("design:paramtypes", [mailer_1.MailerService, typeof (_a = typeof Nunjucks !== "undefined" && Nunjucks) === "function" ? _a : Object])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map