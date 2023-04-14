exports.up = function(knex) {
    return knex.schema.createTable('user', function(table) {
      table.increments('userId').primary();
      table.string('userName', 255).notNullable();
      table.string('password', 255).notNullable();
      table.string('mainCity', 255).notNullable();
    });
  };
  
  exports.down = (knex) => Promise.all([
    knex.schema.dropTable('user'),
  ]);
