exports.up = function (knex) {
  return knex.schema.createTable("agenda", function (table) {
    table.increments("id").primary();
    table.integer("servico_id").unsigned().notNullable().references('id').inTable('servicos');
    table.string("data_operacao").notNullable();
    table.string("hora").notNullable();
    table.integer("cliente_id").unsigned().notNullable().references('id').inTable('clientes');
    table.integer("usuario_id").unsigned().notNullable().references('id').inTable('users');
    table.boolean("cancelado").notNullable();
    table.boolean("confirmado").notNullable();
    table.timestamp("data_inclusao").defaultTo(knex.fn.now());
    table.timestamp("data_alteracao").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
