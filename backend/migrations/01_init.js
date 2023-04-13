exports.up = (knex) => Promise.all([
  knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'),
  knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto";'),
  knex.schema.raw(`
    CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `),
  knex.schema.raw('CREATE SCHEMA IF NOT EXISTS meteo;'),
]);

exports.down = (knex) => Promise;
