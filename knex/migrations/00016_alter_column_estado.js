exports.up = function (knex) {
  return knex.schema.table("estado", function (table) {
    table.string('sigla');
  })
};

exports.down = function (knex) {};
