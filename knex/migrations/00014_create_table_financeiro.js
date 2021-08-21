exports.up = function (knex) {
  return knex.schema.createTable("financeiro", function (table) {
    table.increments("id").primary();
    table
      .integer("corte_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("cortes_realizados");
    table.string("data_operacao").notNullable();
    table.string("hora");
    table
      .integer("usuario_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    table.decimal("valor", "4", "2").notNullable();
    table
      .integer("forma_pagamento_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("formas_pagamento");
    table
      .integer("quitado")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("servicos");
    table
      .integer("tipo_lancamento")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("servicos");
    table
      .string("observacao");
    table.timestamp("data_inclusao").defaultTo(knex.fn.now());
    table.timestamp("data_alteracao").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
