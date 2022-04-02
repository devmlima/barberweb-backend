"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const state_model_1 = require("../models/state.model");
const lodash_1 = require("lodash");
const database_1 = require("../../database");
class StateController {
    findAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = JSON.parse((0, lodash_1.get)(request, "query.filter", ""));
            const { where, limit } = query;
            if (query && query.descricao) {
                where.descricao = { [database_1.Op.iLike]: `%${query.descricao}%` };
            }
            if (query && query.sigla) {
                where.sigla = query.sigla;
            }
            try {
                const state = yield state_model_1.State.findAll({ where, limit, offset: 0 });
                return response.status(200).json(state);
            }
            catch (e) {
                return response.status(500).send("Erro ao pesquisar registro");
            }
        });
    }
    findById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, lodash_1.get)(request, 'params.id', null);
            try {
                const state = yield state_model_1.State.findOne({ where: { id } });
                return response.status(200).json(state);
            }
            catch (e) {
                return response.status(500).send("Erro ao pesquisar registro");
            }
        });
    }
}
exports.default = new StateController();
//# sourceMappingURL=state.controller.js.map