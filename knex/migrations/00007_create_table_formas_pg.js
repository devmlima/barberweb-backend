exports.up = function (knex) {
  return knex.schema.createTable("formas_pagamento", function (table) {
    table.increments("id").primary();
    table.string("descricao").notNullable();
    table.timestamp("data_inclusao").defaultTo(knex.fn.now());
    table.timestamp("data_alteracao").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
