exports.up = function (knex) {
  return knex.schema.createTable("empresa", function (table) {
    table.increments("id").primary();
    table.string("cpfCnpj").notNullable();
    table
    .integer("endereco_id")
    .unsigned()
    .notNullable()
    .references("id")
    .inTable("endereco");
    table.string("razao_social");
    table.string("nome_fantasia");
    table.string("telefone");
    table.timestamp("data_inclusao").defaultTo(knex.fn.now());
    table.timestamp("data_alteracao").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
