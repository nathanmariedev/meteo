import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import { knex } from 'knex';
import knexCaseConverterPlugin from 'knex-case-converter-plugin';
import * as knexConfig from '../../knexfile';
import { PG_CONNECTION } from './database.constants';

export const databaseProviders: Provider[] = [
  {
    provide: PG_CONNECTION,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      if (configService.get('NODE_ENV') !== 'production') {
        knexConfig.debug = true;
      }
      knexConfig.wrapIdentifier = knexCaseConverterPlugin.wrapIdentifier;
      knexConfig.postProcessResponse = knexCaseConverterPlugin.postProcessResponse;

      const pg = knex({
        ...knexConfig,
        connection: {
          connectionString: configService.get('PG_CONNECTION_STRING'),
          connectionTimeoutMillis: 10000, //ms to wait before timing out when connecting a new client (ici 10 secondes)
          statement_timeout: 30000, //abort any statement that takes more than the specified number of milliseconds (ici 30 secondes)
          application_name: 'nestjs-starterkit',
        },
        pool: {
          idleTimeoutMillis: 60000, //from tarn.js : Free resouces are destroyed after this many ms (ici 1 minute)
          reapIntervalMillis: 60000, //from tarn.js : How often to check for idle resources to destroy (ici 1 minute)
          min: +configService.get('KNEX_POOL_MIN'),
          max: +configService.get('KNEX_POOL_MAX'),
        },
      });
      return pg;
    },
  },
];
