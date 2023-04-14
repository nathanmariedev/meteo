import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';
import * as Nunjucks from 'nunjucks';
import { MailType } from './enums/mail-type.enum';
import { MailerOptions } from './interfaces/mailer-options.interface';
export declare class EmailService {
    private readonly mailerService;
    private readonly nunjucks;
    constructor(mailerService: MailerService, nunjucks: Nunjucks);
    sendEmail(type: MailType, options: MailerOptions): Promise<SentMessageInfo>;
    generateEmailHtml(type: MailType, context: Record<string, unknown>): Promise<string>;
}
