
exports.up = function(knex) {
    return knex.schema.createTable('perfil', function(table) {
        table.increments('id').primary();
        table.string('permissoes').notNullable();
        table.integer('usuario_id').unsigned().notNullable().references('id').inTable('users');
        table.timestamp('data_inclusao').defaultTo(knex.fn.now());
        table.timestamp('data_alteracao').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex) {
  
};
