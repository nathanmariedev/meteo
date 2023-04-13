import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';
import * as Nunjucks from 'nunjucks';
import { NUNJUCKS } from '../nunjucks/nunjucks.constants';
import { MailType } from './enums/mail-type.enum';
import { MailerOptions } from './interfaces/mailer-options.interface';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(NUNJUCKS) private readonly nunjucks: Nunjucks,
  ) {}

  async sendEmail(type: MailType, options: MailerOptions): Promise<SentMessageInfo> {
    if (!options.html) {
      options.html = await this.generateEmailHtml(type, options.context);
    }

    if (!options.subject && type === MailType.REGISTER) {
      options.subject = 'Finish your register and activate your account';
    } else if (!options.subject && type === MailType.RESET) {
      options.subject = 'Reset your account password';
    }

    const result = await this.mailerService.sendMail({
      ...options,
    });

    return result;
  }

  async generateEmailHtml(type: MailType, context: Record<string, unknown>): Promise<string> {
    let html: string;

    if (type === MailType.RESET) {
      html = await this.nunjucks.render('email/reset.njk', context);
    } else if (type === MailType.REGISTER) {
      html = await this.nunjucks.render('email/register.njk', context);
    }
    // Il est possible de rajouter un else if pour gérer d'autres types de mails. (il faudra aussi le rajouter dans le mail-type.enum)

    return html;
  }
}
