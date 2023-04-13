import { Module } from '@nestjs/common';
import { NunjucksModule } from '../nunjucks/nunjucks.module';
import { EmailService } from './email.service';

@Module({
  imports: [NunjucksModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
