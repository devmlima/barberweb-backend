exports.up = function (knex) {
  return knex.schema.createTable("clientes", function (table) {
    table.increments("id").primary();
    table
      .integer("endereco_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("endereco");
    table.string("nome").notNullable();
    table.string("cpf");
    table.string("celular").notNullable();
    table.timestamp("data_inclusao").defaultTo(knex.fn.now());
    table.timestamp("data_alteracao").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
