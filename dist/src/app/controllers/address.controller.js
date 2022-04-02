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
const address_model_1 = require("../models/address.model");
const lodash_1 = require("lodash");
class AddressController {
    findAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = request.query;
            try {
                const address = yield address_model_1.Address.findAll();
                return response.status(200).json(address);
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
                const address = yield address_model_1.Address.findOne({ where: { id } });
                return response.status(200).json(address);
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
                yield address_model_1.Address.update(body, {
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
                const address = yield address_model_1.Address.findOne({ where: { id: id } });
                address.destroy();
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
                    rua: body.rua,
                    numero: body.numero,
                    cep: body.cep,
                    estadoId: body.estadoId,
                    cidadeId: body.cidadeId,
                    empresaId: body.empresaId,
                };
                const instance = yield address_model_1.Address.create(params);
                return response.status(200).json(instance);
            }
            catch (e) {
                return response.status(500).send("Erro ao criar registro");
            }
        });
    }
}
exports.default = new AddressController();
//# sourceMappingURL=address.controller.js.map