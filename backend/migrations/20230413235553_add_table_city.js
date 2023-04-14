exports.up = function(knex) {
    return knex.schema.createTable('city', function(table) {
        table.string('insee', 5).primary();
        table.string('cp', 5).notNullable();
        table.string('name', 255).notNullable();
    });
};
  
exports.down = (knex) => Promise.all([
    knex.schema.dropTable('city'),
]);
