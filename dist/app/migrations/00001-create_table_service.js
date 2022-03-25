"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    up: function (sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield sequelize.query(`
        CREATE TABLE public.enfermidade_vinculos (
            id serial NOT NULL,
            descricao varchar(200) NOT NULL,
            data_inclusao timestamp(0) NULL,
            data_alteracao timestamp(0) NULL
        );  
        `);
        });
    },
    down: function (sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sequelize.transaction((transaction) => __awaiter(this, void 0, void 0, function* () { }));
        });
    },
};
//# sourceMappingURL=00001-create_table_service.js.map