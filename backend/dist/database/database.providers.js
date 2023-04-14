"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const config_1 = require("@nestjs/config");
const knex_1 = require("knex");
const knex_case_converter_plugin_1 = require("knex-case-converter-plugin");
const knexConfig = require("../../knexfile");
const database_constants_1 = require("./database.constants");
exports.databaseProviders = [
    {
        provide: database_constants_1.PG_CONNECTION,
        inject: [config_1.ConfigService],
        useFactory: (configService) => {
            if (configService.get('NODE_ENV') !== 'production') {
                knexConfig.debug = true;
            }
            knexConfig.wrapIdentifier = knex_case_converter_plugin_1.default.wrapIdentifier;
            knexConfig.postProcessResponse = knex_case_converter_plugin_1.default.postProcessResponse;
            const pg = (0, knex_1.knex)(Object.assign(Object.assign({}, knexConfig), { connection: {
                    connectionString: configService.get('PG_CONNECTION_STRING'),
                    connectionTimeoutMillis: 10000,
                    statement_timeout: 30000,
                    application_name: 'nestjs-meteo',
                }, pool: {
                    idleTimeoutMillis: 60000,
                    reapIntervalMillis: 60000,
                    min: +configService.get('KNEX_POOL_MIN'),
                    max: +configService.get('KNEX_POOL_MAX'),
                } }));
            return pg;
        },
    },
];
//# sourceMappingURL=database.providers.js.map