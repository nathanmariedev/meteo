import { Module } from '@nestjs/common';
import { nunjucksProvider } from './nunjucks.provider';

@Module({
  providers: [nunjucksProvider],
  exports: [nunjucksProvider],
})
export class NunjucksModule {}
