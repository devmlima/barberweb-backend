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
const lodash_1 = require("lodash");
const database_1 = require("../../database");
const company_model_1 = require("../models/company.model");
class CompanyController {
    find(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = request.query;
            const where = {};
            if (query && query.id) {
                where.id = query.id;
            }
            if (query && query.cpfCnpj) {
                where.cpfCnpj = { [database_1.Op.iLike]: `%${query.cpfCnpj}%` };
            }
            if (query && query.razaoSocial) {
                where.razaoSocial = { [database_1.Op.iLike]: `%${query.razaoSocial}%` };
            }
            if (query && query.nomeFantasia) {
                where.nomeFantasia = { [database_1.Op.iLike]: `%${query.nomeFantasia}%` };
            }
            try {
                const company = yield company_model_1.Company.findAll({ where, limit: 30, offset: 0 });
                return response.json(company);
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
                const user = yield company_model_1.Company.findOne({ where: { id } });
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
            try {
                yield company_model_1.Company.update(body, {
                    where: { id: body.id },
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
                const company = yield company_model_1.Company.findOne({ where: { id: id } });
                company.destroy();
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
            try {
                const params = {
                    cpfCnpj: body.cpfCnpj,
                    enderecoId: body.enderecoId,
                    razaoSocial: body.razaoSocial,
                    nomeFantasia: body.nomeFantasia,
                    telefone: body.telefone,
                };
                const company = yield company_model_1.Company.findOne({
                    where: { cpfCnpj: params.cpfCnpj },
                });
                if (company) {
                    return response.status(401).json("Empresa já cadastrada!");
                }
                const instance = yield company_model_1.Company.create(params);
                return response.status(200).json(instance);
            }
            catch (e) {
                return response.status(500).send("Erro ao criar registro");
            }
        });
    }
}
exports.default = new CompanyController();
//# sourceMappingURL=company.controller.js.map