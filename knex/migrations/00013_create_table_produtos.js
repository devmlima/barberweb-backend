exports.up = function (knex) {
  return knex.schema.createTable("produtos", function (table) {
    table.increments("id").primary();
    table.string("descricao").notNullable();
    table.string("codigo_interno").notNullable();
    table.string("unidade");
    table.decimal("fator_conversao", "4", "2");
    table
      .integer("ficha_financeira_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("ficha_financeira");
    table.string("data_validade");
    table
      .integer("estoque_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("estoque");
    table.timestamp("data_inclusao").defaultTo(knex.fn.now());
    table.timestamp("data_alteracao").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
