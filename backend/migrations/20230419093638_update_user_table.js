exports.up = function(knex) {
  return knex.schema.table('user', function (table) {
    table.dropColumn('userId');
    table.string('userName', 255).notNullable().alter();
    table.primary('userName');
  });
};

exports.down = function(knex) {
  return knex.schema.table('user', function (table) {
    table.dropPrimary('userName');
    table.dropColumn('userName');
    table.increments('userId').primary();
  });
};
