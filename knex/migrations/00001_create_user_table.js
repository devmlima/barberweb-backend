
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('cpf');
        table.string('email').notNullable();
        table.string('celular').notNullable();
        table.string('senha').notNullable();
        table.string('data_nascimento');
        table.timestamp('data_inclusao').defaultTo(knex.fn.now())
        table.timestamp('data_alteracao').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
  
};
