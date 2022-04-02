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
const json2csv_1 = require("json2csv");
const lodash_1 = require("lodash");
const os_1 = require("os");
const database_1 = require("../../database");
const client_model_1 = require("../models/client.model");
const schedule_model_1 = require("../models/schedule.model");
const cutsMade_model_1 = require("./../models/cutsMade.model");
const service_model_1 = require("./../models/service.model");
const aws_1 = require("./../shared/aws");
const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readfilePromise = util.promisify(fs.readFile);
class ScheduleController {
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
            if (query && query.clienteId) {
                where.clienteId = query.clienteId;
            }
            if (query && query.usuarioId) {
                where.usuarioId = query.usuarioId;
            }
            if (query && query.cancelado) {
                where.cancelado = query.cancelado;
            }
            if (query &&
                (query.confirmado === "true" ||
                    query.confirmado === true ||
                    query.confirmado === "false" ||
                    query.confirmado === false)) {
                where.confirmado = query.confirmado;
            }
            if (query && query.dataOperacao) {
                where.dataOperacao = query.dataOperacao;
            }
            try {
                const schedule = yield schedule_model_1.Schedule.findAll({
                    where,
                    limit: 30,
                    offset: 0,
                    include: [client_model_1.Client, service_model_1.Service],
                    order: [['dataAlteracao', 'desc']]
                });
                return response.status(200).json(schedule);
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
                const schedule = yield schedule_model_1.Schedule.findOne({ where: { id }, include: [client_model_1.Client, service_model_1.Service] });
                return response.status(200).json(schedule);
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
                yield schedule_model_1.Schedule.update(body, {
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
                const schedule = yield schedule_model_1.Schedule.findOne({ where: { id: id } });
                schedule.destroy();
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
            body.empresaId = userLogged.empresaId;
            body.usuarioId = userLogged.id;
            try {
                const instance = yield schedule_model_1.Schedule.create(body);
                return response.status(200).json(instance);
            }
            catch (e) {
                return response.status(500).send("Erro ao criar registro");
            }
        });
    }
    scheduleMade(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield cutsMade_model_1.CutsMade.create(request.body);
            }
            catch (error) {
                throw new Error("Erro ao realizar o corte");
            }
            return;
        });
    }
    excel(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const where = {};
                const userLogged = request.headers.userLogged;
                where.empresaId = userLogged.empresaId;
                const schedules = yield schedule_model_1.Schedule.findAll({
                    where,
                    include: [client_model_1.Client, service_model_1.Service],
                    order: [['dataAlteracao', 'desc']]
                });
                const arr = [];
                for (const schedule of schedules) {
                    arr.push({
                        'SERVIÇO': schedule.service.descricao,
                        'CLIENTE': schedule.client.nome,
                        'DATA': schedule.dataOperacao,
                        'HORA': schedule.hora,
                        'VALOR': String(schedule.valor).replace('.', ','),
                        'REALIZADO': schedule.confirmado,
                        'CANCELADO': schedule.cancelado
                    });
                }
                const path = `${(0, os_1.tmpdir)()}/agenda-${new Date().getMilliseconds()}.csv`;
                const rows = (0, json2csv_1.parse)(arr, {
                    delimiter: ';',
                    withBOM: true
                });
                yield writeFile(`${path}`, rows, { encoding: 'utf8' });
                const buffer = yield readfilePromise(`${path}`);
                const name = `agenda-${new Date().getMilliseconds()}.csv`;
                const bucket = 'barberweb/agendas';
                const url = yield (0, aws_1.savePDFS3)(buffer, 'json', name, bucket);
                return response.status(200).json(url);
            }
            catch (e) {
                return response.status(500).send("Erro ao criar registro");
            }
            return;
        });
    }
}
exports.default = new ScheduleController();
//# sourceMappingURL=schedule.controller.js.map