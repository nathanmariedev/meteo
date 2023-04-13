// eslint-disable-next-line @typescript-eslint/typedef
exports.seed = async (knex) => {
  if (process.env.NODE_ENV !== 'production') {
    await knex.schema.raw(`
      TRUNCATE "starterkit"."user";
    `);
    // password = hellohello123
    await knex.table('starterkit.user').insert([
      {
        email: 'user1@email.com',
        password: '$2y$10$lZiziXuJnoybZkRtibjqUeinmZ92uvuWXoeG40Z5pJteEnNzweWlW',
        is_active: 't',
      },
      {
        email: 'user2@email.com',
        password: '$2y$10$lZiziXuJnoybZkRtibjqUeinmZ92uvuWXoeG40Z5pJteEnNzweWlW',
        is_active: 't',
      },
      {
        email: 'user3@email.com',
        password: '$2y$10$lZiziXuJnoybZkRtibjqUeinmZ92uvuWXoeG40Z5pJteEnNzweWlW',
        is_active: 'f',
      },
    ]);
  } else {
    console.warn('DO NOT USE SEEDS IN PRODUCTION');
    throw new Error('DO NOT USE SEEDS IN PRODUCTION');
  }
};
