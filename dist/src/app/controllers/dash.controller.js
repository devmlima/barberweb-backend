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
exports.verifyMonth = exports.verifyDay = void 0;
const lodash_1 = require("lodash");
const database_1 = require("./../../database");
const client_model_1 = require("./../models/client.model");
const cutsMade_model_1 = require("./../models/cutsMade.model");
const schedule_model_1 = require("./../models/schedule.model");
const service_model_1 = require("./../models/service.model");
const user_model_1 = require("./../models/user.model");
class DashboardController {
    cutsAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userLogged = request.headers.userLogged;
                const isAdmin = request.headers.admin;
                const where = { empresaId: userLogged.empresaId };
                if (!isAdmin) {
                    where.usuarioId = userLogged.id;
                }
                const cuts = yield cutsMade_model_1.CutsMade.count({ where });
                return response.status(200).json(cuts);
            }
            catch (e) {
                return response.status(500).send("Ocorreu um erro, tente novamente!");
            }
        });
    }
    faturamentAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userLogged = request.headers.userLogged;
                const isAdmin = request.headers.admin;
                const where = { empresaId: userLogged.empresaId };
                if (!isAdmin) {
                    where.usuarioId = userLogged.id;
                }
                const cuts = yield cutsMade_model_1.CutsMade.findAll({ where });
                const values = cuts.map(cut => {
                    if (!isNaN(+cut.valor)) {
                        return +cut.valor;
                    }
                    else {
                        return 0;
                    }
                });
                const some = values.reduce((ac, el) => ac += el);
                return response.status(200).json(`R$ ${some.toFixed(2)}`);
            }
            catch (e) {
                return response.status(500).send("Ocorreu um erro, tente novamente!");
            }
        });
    }
    userMonth(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userLogged = request.headers.userLogged;
                const cuts = yield cutsMade_model_1.CutsMade.findAll({ where: { empresaId: userLogged.empresaId } });
                const users = yield user_model_1.User.findAll({ where: { empresaId: userLogged.empresaId } });
                let count = 0;
                let nameUser = '';
                for (const user of users) {
                    const map = cuts.filter(cut => cut.usuarioId === user.id);
                    if (!count || count < map.length) {
                        count = map.length;
                        nameUser = user.nome;
                    }
                }
                return response.status(200).json(nameUser);
            }
            catch (e) {
                return response.status(500).send("Ocorreu um erro, tente novamente!");
            }
        });
    }
    faturamentForUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userLogged = request.headers.userLogged;
                const cuts = yield cutsMade_model_1.CutsMade.findAll({ where: { empresaId: userLogged.empresaId } });
                const users = yield user_model_1.User.findAll({ where: { empresaId: userLogged.empresaId } });
                const isAdmin = request.headers.admin;
                const obj = { labels: [], data: [] };
                for (const user of users) {
                    const values = cuts.filter(cut => cut.usuarioId === user.id);
                    let some = 0;
                    if (values.length > 0) {
                        some = values.map(v => +v.valor).reduce((ac, el) => ac += el);
                    }
                    if (!some) {
                        continue;
                    }
                    else if (isAdmin) {
                        obj.labels.push(user.nome);
                        obj.data.push(some.toFixed(2));
                    }
                    else {
                        if (user.id === userLogged.id) {
                            obj.labels.push(user.nome);
                            obj.data.push(some.toFixed(2));
                        }
                    }
                }
                return response.status(200).json(obj);
            }
            catch (e) {
                return response.status(500).send("Ocorreu um erro, tente novamente!");
            }
        });
    }
    faturamentLastSevenDays(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userLogged = request.headers.userLogged;
                const date = new Date();
                const day = date.getDate();
                const month = date.getMonth() + 1;
                let actualDay = day;
                let actualMonth = month;
                if (String(day).length === 1) {
                    actualDay = `0${day}`;
                }
                if (String(month).length === 1) {
                    actualMonth = `0${month}`;
                }
                const day1 = `${verifyDay(day, month, 1)}/${verifyMonth(month, day, 1)}/${date.getFullYear()}`;
                const day2 = `${verifyDay(day, month, 2)}/${verifyMonth(month, day, 2)}/${date.getFullYear()}`;
                const day3 = `${verifyDay(day, month, 3)}/${verifyMonth(month, day, 3)}/${date.getFullYear()}`;
                const day4 = `${verifyDay(day, month, 4)}/${verifyMonth(month, day, 4)}/${date.getFullYear()}`;
                const day5 = `${verifyDay(day, month, 5)}/${verifyMonth(month, day, 5)}/${date.getFullYear()}`;
                const day6 = `${verifyDay(day, month, 6)}/${verifyMonth(month, day, 6)}/${date.getFullYear()}`;
                const day7 = `${verifyDay(day, month, 7)}/${verifyMonth(month, day, 7)}/${date.getFullYear()}`;
                const days = [day1, day2, day3, day4, day5, day6, day7];
                const isAdmin = request.headers.admin;
                const where = {
                    empresaId: userLogged.empresaId,
                    data: { [database_1.Op.in]: days }
                };
                if (!isAdmin) {
                    where.usuarioId = userLogged.id;
                }
                const cuts = yield cutsMade_model_1.CutsMade.findAll({
                    where,
                    include: [user_model_1.User]
                });
                const obj = { labels: [], data: [] };
                for (const d of days) {
                    let values = [];
                    values = cuts.filter(cut => cut.data === d);
                    const some = values && values.length > 0 ? values.map(v => +v.valor).reduce((ac, el) => ac += el) : 0;
                    obj.labels.push(d);
                    obj.data.push(some);
                }
                return response.status(200).json(obj);
            }
            catch (e) {
                return response.status(500).send("Ocorreu um erro, tente novamente!");
            }
        });
    }
    servicesMades(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLogged = request.headers.userLogged;
            const months = [
                'meses', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ];
            const actualMonth = new Date().getMonth() + 1;
            const monthsSearch = [];
            for (let i = 1; i <= actualMonth; i++) {
                const element = months[i];
                monthsSearch.push(element);
            }
            const isAdmin = request.headers.admin;
            const where = {
                empresaId: userLogged.empresaId,
            };
            if (!isAdmin) {
                where.usuarioId = userLogged.id;
            }
            const cuts = yield cutsMade_model_1.CutsMade.findAll({
                where,
                include: [user_model_1.User]
            });
            const obj = { labels: [], data: [] };
            for (const m of monthsSearch) {
                if (m === 'meses')
                    continue;
                let values = [];
                values = cuts.filter(cut => {
                    let mon = +cut.data.split('/')[1];
                    return months[mon] === m;
                });
                const some = values && values.length > 0 ? values.map(v => +v.valor).reduce((ac, el) => ac += el) : 0;
                obj.labels.push(m);
                obj.data.push(some);
            }
            return response.status(200).json(obj);
        });
    }
    schedules(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLogged = request.headers.userLogged;
            const months = [
                'meses', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ];
            const actualMonth = new Date().getMonth() + 1;
            const monthsSearch = [];
            for (let i = 1; i <= actualMonth; i++) {
                const element = months[i];
                monthsSearch.push(element);
            }
            const isAdmin = request.headers.admin;
            const where = {
                empresaId: userLogged.empresaId,
                cancelado: false,
            };
            if (!isAdmin) {
                where.usuarioId = userLogged.id;
            }
            const schedules = yield schedule_model_1.Schedule.findAll({
                where
            });
            const obj = { labels: [], data: [] };
            for (const m of monthsSearch) {
                if (m === 'meses')
                    continue;
                let values = [];
                values = schedules.filter(schedule => {
                    let mon = +schedule.dataOperacao.split('/')[1];
                    return months[mon] === m;
                });
                const some = values && values.length > 0 ? values.map(v => +v.valor).reduce((ac, el) => ac += el) : 0;
                obj.labels.push(m);
                obj.data.push(some);
            }
            return response.status(200).json(obj);
        });
    }
    schedulesCanceled(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLogged = request.headers.userLogged;
            const months = [
                'meses', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ];
            const actualMonth = new Date().getMonth() + 1;
            const monthsSearch = [];
            for (let i = 1; i <= actualMonth; i++) {
                const element = months[i];
                monthsSearch.push(element);
            }
            const isAdmin = request.headers.admin;
            const where = {
                empresaId: userLogged.empresaId,
                cancelado: true,
            };
            if (!isAdmin) {
                where.usuarioId = userLogged.id;
            }
            const schedules = yield schedule_model_1.Schedule.findAll({
                where
            });
            const obj = { labels: [], data: [] };
            for (const m of monthsSearch) {
                if (m === 'meses')
                    continue;
                let values = [];
                values = schedules.filter(schedule => {
                    let mon = +schedule.dataOperacao.split('/')[1];
                    return months[mon] === m;
                });
                const some = values && values.length > 0 ? values.map(v => +v.valor).reduce((ac, el) => ac += el) : 0;
                obj.labels.push(m);
                obj.data.push(some);
            }
            return response.status(200).json(obj);
        });
    }
    relClient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLogged = request.headers.userLogged;
            let query = (0, lodash_1.get)(request, "query.params", null);
            if (query) {
                query = JSON.parse(query);
            }
            const isAdmin = request.headers.admin;
            const where = {
                empresaId: userLogged.empresaId,
            };
            const clients = yield client_model_1.Client.findAll({
                where
            });
            if (query && query.service) {
                where.servicoId = query.service;
            }
            if (query && query.client) {
                where.clienteId = query.client;
            }
            if (!isAdmin) {
                where.usuarioId = userLogged.id;
            }
            const cuts = yield cutsMade_model_1.CutsMade.findAll({
                where,
                include: [service_model_1.Service],
                order: [['data', 'desc']]
            });
            const obj = [];
            let totAll = 0;
            for (const client of clients) {
                const values = cuts.filter(cut => cut.clienteId === client.id);
                if (!values || values.length === 0)
                    continue;
                const some = values.map(value => +value.valor).reduce((ac, el) => ac += el);
                totAll += some;
                obj.push({
                    cliente: client.nome,
                    servico: values[0].service.descricao,
                    data: values[0].data,
                    total: `R$ ${some.toFixed(2).toString().replace('.', ',')}`
                });
            }
            obj.push({
                cliente: 'TOTAIS',
                servico: '-',
                data: '-',
                total: `R$ ${totAll.toFixed(2).toString().replace('.', ',')}`
            });
            return response.status(200).json(obj);
        });
    }
    relServices(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLogged = request.headers.userLogged;
            let query = (0, lodash_1.get)(request, "query.params", null);
            if (query) {
                query = JSON.parse(query);
            }
            const isAdmin = request.headers.admin;
            const where = {
                empresaId: userLogged.empresaId,
            };
            if (query && query.service) {
                where.servicoId = query.service;
            }
            const services = yield service_model_1.Service.findAll({
                where,
            });
            if (!isAdmin) {
                where.usuarioId = userLogged.id;
            }
            const cuts = yield cutsMade_model_1.CutsMade.findAll({
                where,
                order: [['data', 'desc']]
            });
            const obj = [];
            let totAll = 0;
            let totAllClients = 0;
            for (const service of services) {
                const values = cuts.filter(cut => cut.servicoId === service.id);
                if (!values || values.length === 0)
                    continue;
                const some = values.map(value => +value.valor).reduce((ac, el) => ac += el);
                totAll += some;
                totAllClients += values.length;
                obj.push({
                    servico: service.descricao,
                    totalClientes: values.length,
                    total: `R$ ${some.toFixed(2).toString().replace('.', ',')}`
                });
            }
            obj.push({
                servico: 'TOTAIS',
                totalClientes: totAllClients,
                total: `R$ ${totAll.toFixed(2).toString().replace('.', ',')}`
            });
            return response.status(200).json(obj);
        });
    }
}
exports.default = new DashboardController();
function verifyDay(day, month, numberDay) {
    let oldDay = null;
    switch (numberDay) {
        case 1:
            oldDay = day;
            break;
        case 2:
            if (day === 1) {
                day = [1, 3, 5, 7, 8, 10, 12].includes(month) ? 31 : 30;
                oldDay = day;
            }
            else {
                oldDay = day - 1;
            }
            break;
        case 3:
            if (day === 2) {
                day = [1, 3, 5, 7, 8, 10, 12].includes(month) ? 31 : 30;
                oldDay = day;
            }
            else {
                oldDay = day - 2;
            }
            break;
        case 4:
            if (day === 2) {
                day = [1, 3, 5, 7, 8, 10, 12].includes(month) ? 31 : 30;
                oldDay = day;
            }
            else {
                oldDay = day - 3;
            }
            break;
        case 5:
            if (day === 2) {
                day = [1, 3, 5, 7, 8, 10, 12].includes(month) ? 31 : 30;
                oldDay = day;
            }
            else {
                oldDay = day - 4;
            }
            break;
        case 6:
            if (day === 2) {
                day = [1, 3, 5, 7, 8, 10, 12].includes(month) ? 31 : 30;
                oldDay = day;
            }
            else {
                oldDay = day - 5;
            }
            break;
        case 7:
            if (day === 2) {
                day = [1, 3, 5, 7, 8, 10, 12].includes(month) ? 31 : 30;
                oldDay = day;
            }
            else {
                oldDay = day - 6;
            }
            break;
        default:
            oldDay = day;
            break;
    }
    if (String(oldDay).length === 1) {
        oldDay = `0${oldDay}`;
    }
    return oldDay;
}
exports.verifyDay = verifyDay;
function verifyMonth(month, day, numberDay) {
    let oldMonth = null;
    if (numberDay === 1) {
        oldMonth = month;
    }
    else {
        switch (day) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                oldMonth = month - 1;
                break;
            default:
                oldMonth = month;
                break;
        }
    }
    if (String(oldMonth).length === 1) {
        oldMonth = `0${oldMonth}`;
    }
    return oldMonth;
}
exports.verifyMonth = verifyMonth;
//# sourceMappingURL=dash.controller.js.map