exports.up = (knex) => Promise.all([
  knex.schema.raw(`
    CREATE TABLE meteo.user (
      user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      email VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      is_active boolean NOT NULL,
      last_login_at TIMESTAMPTZ(3),
      created_at TIMESTAMPTZ(3) DEFAULT NOW(),
      updated_at TIMESTAMPTZ(3) DEFAULT NOW(),
      deleted_at TIMESTAMPTZ(3)
    );

    CREATE UNIQUE INDEX user_lower_email_idx ON meteo.user (LOWER("email")) WHERE ("email" IS NOT NULL AND "deleted_at" IS NULL);
  `),
  knex.schema.raw(`
    CREATE TRIGGER user_set_updated_at
      BEFORE UPDATE ON meteo.user
      FOR EACH ROW
      EXECUTE PROCEDURE set_updated_at();
  `),
]);

exports.down = (knex) => Promise.all([
  knex.schema.dropTable('meteo.user'),
]);
