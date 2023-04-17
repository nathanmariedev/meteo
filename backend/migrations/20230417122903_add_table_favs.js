// eslint-disable-next-line @typescript-eslint/typedef
exports.up = function (knex) {
  // eslint-disable-next-line @typescript-eslint/typedef
  return knex.schema.createTable('favs', function (table) {
    table.string('insee', 5);
    table.integer('userId');
    table.primary(['insee', 'userId']);
  });
};

// eslint-disable-next-line @typescript-eslint/typedef
exports.down = (knex) => Promise.all([knex.schema.dropTable('favs')]);
