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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_model_1 = require("./../models/address.model");
const city_model_1 = require("./../models/city.model");
const state_model_1 = require("./../models/state.model");
const client_model_1 = require("../models/client.model");
const lodash_1 = require("lodash");
const database_1 = require("../../database");
const superagent_1 = __importDefault(require("superagent"));
class ClientController {
    searchCep(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = JSON.parse((0, lodash_1.get)(request, "query.filter", ""));
            if (!query.cep)
                return;
            try {
                let cepResponse = yield superagent_1.default.get(`viacep.com.br/ws/${query.cep}/json/`);
                if (!cepResponse) {
                    return response.status(204).json();
                }
                cepResponse = cepResponse.body;
                const state = yield state_model_1.State.findOne({ where: { sigla: cepResponse.uf } });
                const city = yield city_model_1.City.findOne({ where: { estadoId: cepResponse.uf, descricao: cepResponse.localidade } });
                const addresInterface = {
                    rua: cepResponse.logradouro,
                    bairro: cepResponse.bairro,
                    estadoId: state,
                    cidadeId: city,
                };
                return response.status(200).json(addresInterface);
            }
            catch (e) {
                return response.status(500).send("Erro ao pesquisar registro");
            }
        });
    }
    findAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = request.query;
            const userLogged = request.headers.userLogged;
            const where = {};
            where.empresaId = userLogged.empresaId;
            if (query && query.id) {
                where.id = query.id;
            }
            if (query && query.nome) {
                where.nome = { [database_1.Op.iLike]: `%${query.nome}%` };
            }
            if (query && query.cpfCnpj) {
                where.cpfCnpj = { [database_1.Op.iLike]: `%${query.cpfCnpj}%` };
            }
            try {
                const client = yield client_model_1.Client.findAll({ where, limit: 30, offset: 0, order: ['id'] });
                return response.status(200).json(client);
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
                const client = yield client_model_1.Client.findOne({
                    where: { id },
                    include: [{ model: address_model_1.Address, include: [state_model_1.State, city_model_1.City] },
                    ]
                });
                return response.status(200).json(client);
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
                const address = body.endereco;
                yield address_model_1.Address.update(address, {
                    where: { id: address.addressId }
                });
                delete body.addressId;
                yield client_model_1.Client.update(body, {
                    where: { id: body.id },
                });
                return response.status(200).json(true);
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
                const client = yield client_model_1.Client.findOne({ where: { id: id } });
                client.destroy();
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
            const companyId = request.headers.companyId;
            body.empresaId = companyId;
            try {
                let instanceClient = yield client_model_1.Client.findOne({
                    where: { empresaId: companyId, nome: { [database_1.Op.iLike]: body.nome } },
                });
                const obj = body.endereco;
                obj.empresaId = companyId;
                const addresInstance = yield address_model_1.Address.create(obj);
                body.enderecoId = addresInstance.id;
                if (instanceClient) {
                    response
                        .status(401)
                        .json("Já existe um cliente cadastrado com o nome cadastrado!");
                    return;
                }
                const instance = yield client_model_1.Client.create(body);
                return response.status(200).json(instance);
            }
            catch (e) {
                return response.status(500).send("Erro ao criar registro");
            }
        });
    }
}
exports.default = new ClientController();
//# sourceMappingURL=client.controller.js.map