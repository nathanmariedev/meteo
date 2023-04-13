import { Provider } from '@nestjs/common';
import * as nunjucks from 'nunjucks';
import * as path from 'path';
import { NUNJUCKS } from './nunjucks.constants';

export const nunjucksProvider: Provider = {
  provide: NUNJUCKS,
  useFactory: async () => {
    return new nunjucks.Environment(
      new nunjucks.FileSystemLoader(path.join(__dirname, './../common/views')),
    );
  },
};
