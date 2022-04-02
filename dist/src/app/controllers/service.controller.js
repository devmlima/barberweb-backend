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
Object.defineProperty(exports, "__esModule", { value: true });
const service_model_1 = require("../models/service.model");
const lodash_1 = require("lodash");
const database_1 = require("../../database");
class ServiceController {
    find(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = request.query;
            const userLogged = request.headers.userLogged;
            const where = {};
            where.empresaId = userLogged.empresaId;
            if (query && query.id) {
                where.id = query.id;
            }
            if (query && query.descricao) {
                where.descricao = { [database_1.Op.iLike]: `%${query.descricao}%` };
            }
            try {
                const service = yield service_model_1.Service.findAll({
                    where,
                    limit: 30,
                });
                return response.json(service);
            }
            catch (e) {
                return response.status(500).send("Erro ao pesquisar registro");
            }
        });
    }
    findById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, lodash_1.get)(request, "params.id", null);
            try {
                const user = yield service_model_1.Service.findOne({ where: { id } });
                return response.json(user);
            }
            catch (e) {
                return response.status(500).send("Erro ao pesquisar registro");
            }
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            const userLogged = request.headers.userLogged;
            try {
                yield service_model_1.Service.update(body, {
                    where: { id: body.id, empresaId: userLogged.empresaId },
                });
                return response.json(true);
            }
            catch (e) {
                return response.status(500).send("Erro ao atualizar registro");
            }
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, lodash_1.get)(request, "params.id", null);
            try {
                const service = yield service_model_1.Service.findOne({ where: { id: id } });
                service.destroy();
                return response.status(200).json(true);
            }
            catch (e) {
                return response.status(500).send("Erro ao excluir registro");
            }
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            const userLogged = request.headers.userLogged;
            try {
                const params = {
                    descricao: body.descricao,
                    empresaId: userLogged.empresaId,
                };
                const instance = yield service_model_1.Service.create(params);
                return response.status(200).json(instance);
            }
            catch (e) {
                return response.status(500).send("Erro ao criar registro");
            }
        });
    }
}
exports.default = new ServiceController();
//# sourceMappingURL=service.controller.js.map