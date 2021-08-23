exports.up = function (knex) {
  return knex.schema.table("clientes", function (table) {
    table.integer('empresa_id').unsigned().notNullable().references('id').inTable('empresa');
  })
  .table("financeiro", function (table) {
    table.integer('empresa_id').unsigned().notNullable().references('id').inTable('empresa');
  })
  .table("produtos", function (table) {
    table.integer('empresa_id').unsigned().notNullable().references('id').inTable('empresa');
  })
  .table("ficha_financeira", function (table) {
    table.integer('empresa_id').unsigned().notNullable().references('id').inTable('empresa');
  })
  .table("estoque", function (table) {
    table.integer('empresa_id').unsigned().notNullable().references('id').inTable('empresa');
  })
  .table("cortes_realizados", function (table) {
    table.integer('empresa_id').unsigned().notNullable().references('id').inTable('empresa');
  })
  .table("agenda", function (table) {
    table.integer('empresa_id').unsigned().notNullable().references('id').inTable('empresa');
  })
  .table("servicos", function (table) {
    table.integer('empresa_id').unsigned().notNullable().references('id').inTable('empresa');
  })
  .table("formas_pagamento", function (table) {
    table.integer('empresa_id').unsigned().notNullable().references('id').inTable('empresa');
  })
  .table("endereco", function (table) {
    table.integer('empresa_id').unsigned().notNullable().references('id').inTable('empresa');
  })
  .table("perfil", function (table) {
    table.integer('empresa_id').unsigned().notNullable().references('id').inTable('empresa');
  })
  .table("users", function (table) {
    table.integer('empresa_id').unsigned().notNullable().references('id').inTable('empresa');
  })
};

exports.down = function (knex) {};
