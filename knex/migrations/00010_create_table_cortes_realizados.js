exports.up = function (knex) {
  return knex.schema.createTable("cortes_realizados", function (table) {
    table.increments("id").primary();
    table.string("descricao").notNullable();
    table.integer("usuario_id").unsigned().notNullable().references('id').inTable('users');
    table.integer("cliente_id").unsigned().notNullable().references('id').inTable('clientes');
    table.decimal("valor", "8", "2").notNullable();
    table.string("data").notNullable();
    table.integer("servico_id").unsigned().notNullable().references('id').inTable('servicos');
    table.integer("forma_pagamento_id").unsigned().notNullable().references('id').inTable('formas_pagamento');
    table.timestamp("data_inclusao").defaultTo(knex.fn.now());
    table.timestamp("data_alteracao").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
