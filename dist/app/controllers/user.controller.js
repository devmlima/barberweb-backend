"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const profile_model_1 = require("./../models/profile.model");
const company_model_1 = require("../models/company.model");
const user_model_1 = require("../models/user.model");
const database_1 = require("../../database");
const lodash_1 = require("lodash");
const uuid_1 = require("uuid");
const crypto = __importStar(require("crypto"));
class UserController {
    find(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = request.query;
            const userLogged = request.headers.userLogged;
            try {
                const user = yield user_model_1.User.findAll({
                    where: { empresaId: userLogged.empresaId }, include: [profile_model_1.Profile]
                });
                return response.status(200).json(user);
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
                const user = yield user_model_1.User.findOne({ where: { id: id }, include: [profile_model_1.Profile] });
                delete user.senha;
                delete user.secret;
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
                yield user_model_1.User.update(body, { where: { id: body.id } });
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
                const user = yield user_model_1.User.findOne({ where: { id: id } });
                user.destroy();
                return response.status(200).json(true);
            }
            catch (e) {
                return response.status(500).json("Erro ao excluir registro");
            }
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            const companyId = request.headers.companyId;
            try {
                const params = {
                    nome: body.nome,
                    cpf: body.cpf,
                    email: body.email,
                    celular: body.celular,
                    senha: body.senha,
                    dataNascimento: body.dataNascimento,
                    empresaId: companyId,
                    perfilId: body.perfilId,
                };
                let instance = yield user_model_1.User.findOne({
                    where: { email: { [database_1.Op.iLike]: body.email } },
                });
                if (instance) {
                    response
                        .status(401)
                        .json("Já existe um usuário cadastrado com o email informado!");
                    return;
                }
                instance = yield user_model_1.User.create(params);
                const { token, expiresIn } = instance.generateToken();
                return response
                    .status(200)
                    .json(Object.assign(Object.assign({}, instance.json()), { token, expiresIn }));
            }
            catch (e) {
                throw new Error("Erro ao criar registro");
            }
        });
    }
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            if (!body)
                return response.status(400).json("Dados de usuário não informado!");
            if (!body.email)
                return response.status(400).json("Email não informado!");
            if (!body.senha && !body.provider)
                response.status(400).json("Senha não informada!");
            const user = yield user_model_1.User.findOne({ where: { email: body.email } });
            if (!user)
                response.status(400).json("Usuário não encontrado!");
            if (!body.provider && !user.compareSenha(body.senha)) {
                response.status(400).json("Senha inválida");
            }
            const instance = user.json();
            const { token } = user.generateToken();
            const result = Object.assign(Object.assign({}, instance), { token });
            return response.json(result);
        });
    }
    signUp(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            const company = body.empresa;
            try {
                let instanceCompany = yield company_model_1.Company.findOne({
                    where: { cpfCnpj: { [database_1.Op.iLike]: company.cpfCnpj } },
                });
                if (instanceCompany) {
                    response
                        .status(401)
                        .json("Já existe uma empresa cadastrada com o documento informado!");
                    return;
                }
                instanceCompany = yield company_model_1.Company.create(company);
                const params = {
                    nome: body.nome,
                    cpf: body.cpf,
                    email: body.email,
                    celular: body.celular,
                    senha: body.senha,
                    dataNascimento: body.dataNascimento,
                    empresaId: instanceCompany.id,
                    image: body.image,
                    provider: body.provider,
                };
                if (params.provider) {
                    params.senha = (0, uuid_1.v4)();
                }
                let instance = yield user_model_1.User.findOne({
                    where: { email: { [database_1.Op.iLike]: body.email } },
                });
                if (instance) {
                    response
                        .status(401)
                        .json("Já existe um usuário cadastrado com o documento informado!");
                    return;
                }
                instance = yield user_model_1.User.create(params);
                const { token, expiresIn } = instance.generateToken();
                return response
                    .status(200)
                    .json(Object.assign(Object.assign({}, instance.json()), { token, expiresIn }));
            }
            catch (e) {
                response.status(400).json("Erro ao criar registro");
            }
        });
    }
    dataUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = request.query;
            const userLogged = request.headers.userLogged;
            try {
                const user = yield user_model_1.User.findOne({
                    where: { empresaId: userLogged.empresaId, id: userLogged.id },
                });
                const instance = user.json();
                const { token } = user.generateToken();
                const result = Object.assign(Object.assign({}, instance), { token });
                return response.status(200).json(result);
            }
            catch (e) {
                return response.status(401).send("Erro ao pesquisar registro");
            }
        });
    }
    verifyToken(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = request.headers.userLogged;
                const token = (0, lodash_1.get)(request, "headers.authorization", "")
                    .replace("Bearer", "")
                    .trim();
                const userModel = yield user_model_1.User.findOne({ where: { id: user.id } });
                const valid = userModel.validateToken(token, userModel.secret);
                if (valid)
                    return response.status(200).json(valid);
                else
                    return response
                        .status(401)
                        .json("Sessão expirada, faça login novamente!");
            }
            catch (e) {
                return response
                    .status(501)
                    .json("Erro ao validar token, entre em contato com o administrador do sistema");
            }
        });
    }
    updatePassword(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newPassword, actualPassword } = request.body;
            const userLogged = request.headers.userLogged;
            const pass = crypto.createHmac("sha256", newPassword).digest("hex");
            const user = yield user_model_1.User.findOne({ where: { id: userLogged.id } });
            try {
                if (user.compareSenha(actualPassword)) {
                    user.senha = pass;
                    yield user.save();
                    response.send();
                }
                else {
                    response.json({ error: 'Senha atual inválida' }).status(400);
                }
            }
            catch (error) {
                response.json({ error: 'Ocorreu um erro ao atualizar a senha' }).status(500);
            }
            return;
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map