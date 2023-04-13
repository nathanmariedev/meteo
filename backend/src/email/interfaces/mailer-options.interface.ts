import { ReadStream } from 'fs';

export interface MailerOptions {
  to: string;
  subject?: string;
  html?: string;
  from?: string;
  context?: any;
  attachments?: {
    filename: string;
    content?: Buffer | ReadStream;
    path?: string;
  }[];
}
