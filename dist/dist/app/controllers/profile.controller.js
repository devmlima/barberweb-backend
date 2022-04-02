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
const database_1 = require("./../../database");
const profile_model_1 = require("../models/profile.model");
const lodash_1 = require("lodash");
class ProfileController {
    findAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = request.query;
            const userLogged = request.headers.userLogged;
            try {
                const profile = yield profile_model_1.Profile.findAll({
                    where: { empresaId: userLogged.empresaId },
                });
                return response.status(200).json(profile);
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
                const profile = yield profile_model_1.Profile.findOne({ where: { id } });
                return response.status(200).json(profile);
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
                yield profile_model_1.Profile.update(body, {
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
                const profile = yield profile_model_1.Profile.findOne({ where: { id: id } });
                profile.destroy();
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
            const userLogged = request.headers.userLogged;
            try {
                const object = {
                    id: body.id,
                    permissoes: body.permissoes,
                    empresaId: companyId,
                    descricao: body.descricao,
                };
                let instanceProfile = yield profile_model_1.Profile.findOne({
                    where: { descricao: { [database_1.Op.iLike]: body.descricao } },
                });
                if (instanceProfile) {
                    response
                        .status(401)
                        .json("Já existe um perfil cadastrado com a descrição informada!");
                    return;
                }
                const instance = yield profile_model_1.Profile.create(object);
                return response.status(200).json(instance);
            }
            catch (e) {
                console.error(e);
                return response.status(500).send("Erro ao criar registro");
            }
        });
    }
}
exports.default = new ProfileController();
//# sourceMappingURL=profile.controller.js.map