exports.up = function (knex) {
  return knex.schema.createTable("ficha_financeira", function (table) {
    table.increments("id").primary();
    table.decimal("valor_venda", '4', "2").notNullable();
    table.string("valor_custo", '4', "2");
    table.timestamp("data_inclusao").defaultTo(knex.fn.now());
    table.timestamp("data_alteracao").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
