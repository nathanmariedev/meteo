// eslint-disable-next-line @typescript-eslint/typedef
exports.up = function(knex) {
  return knex.schema.alterTable('favs', function(table) {
    table.dropPrimary(); // remove the primary key constraint
    table.dropColumn('userId'); // drop the userId column
    table.string('userName', 255).notNullable(); // add the userName column
    table.primary(['insee', 'userName']); // add the primary key constraint on the 'insee' and 'userName' columns
  });
};

// eslint-disable-next-line @typescript-eslint/typedef
exports.down = function(knex) {
  return knex.schema.alterTable('favs', function(table) {
    table.dropPrimary(); // remove the primary key constraint
    table.dropColumn('userName'); // drop the userName column
    table.integer('userId'); // add back the userId column
    table.primary(['insee', 'userId']); // add the primary key constraint on the 'insee' and 'userId' columns
  });
};
