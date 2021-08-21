
exports.up = function(knex) {
    return knex.schema.createTable('endereco', function(table) {
        table.increments('id').primary();
        table.string('rua').notNullable();
        table.integer('numero').notNullable();
        table.string('cep').notNullable();
        table.integer('estado_id').notNullable().unsigned().notNullable().references('id').inTable('estado');
        table.integer('cidade_id').notNullable().unsigned().notNullable().references('id').inTable('cidade');
        table.timestamp('data_inclusao').defaultTo(knex.fn.now());
        table.timestamp('data_alteracao').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
  
};
