const path = require('path');

module.exports = {
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  pool: {
    min: parseInt(process.env.KNEX_POOL_MIN, 10),
    max: parseInt(process.env.KNEX_POOL_MAX, 10),
  },
  searchPath: ['public', 'meteo'],
  migrations: {
    directory: path.join(__dirname, './migrations'),
  },
  seeds: {
    directory: path.join(__dirname, './seeds'),
  },
};
