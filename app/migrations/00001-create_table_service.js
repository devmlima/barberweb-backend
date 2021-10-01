"use strict";

module.exports = {
    up: async function (sequelize) {
        await sequelize.query(`
        CREATE TABLE public.enfermidade_vinculos (
            id serial NOT NULL,
            descricao varchar(200) NOT NULL,
            data_inclusao timestamp(0) NULL,
            data_alteracao timestamp(0) NULL
        );  
        `);
    },
    down: async function (sequelize) {
        return await sequelize.transaction(async (transaction) => { });
    },
};