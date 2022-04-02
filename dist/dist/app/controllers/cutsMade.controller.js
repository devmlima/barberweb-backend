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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarPdfRelatorio = void 0;
const lodash_1 = require("lodash");
const pdfmake_1 = __importDefault(require("pdfmake"));
const database_1 = require("../../database");
const cutsMade_model_1 = require("../models/cutsMade.model");
const client_model_1 = require("./../models/client.model");
const schedule_model_1 = require("./../models/schedule.model");
const service_model_1 = require("./../models/service.model");
const user_model_1 = require("./../models/user.model");
const aws_1 = require("./../shared/aws");
class CutsMadeController {
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
                const cutsMade = yield cutsMade_model_1.CutsMade.findAll({
                    where,
                    limit: 30,
                    include: [client_model_1.Client, service_model_1.Service, user_model_1.User],
                    order: [['dataAlteracao', 'desc']]
                });
                return response.json(cutsMade);
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
                const user = yield cutsMade_model_1.CutsMade.findOne({ where: { id } });
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
                yield cutsMade_model_1.CutsMade.update(body, {
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
                const cutsMade = yield cutsMade_model_1.CutsMade.findOne({ where: { id: id } });
                cutsMade.destroy();
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
            const param = {
                descricao: '',
                empresaId: null,
                usuarioId: null,
                clienteId: null,
                servicoId: null,
                valor: null,
                formaPagamentoId: null,
                cancelado: false,
                hora: '',
                data: '',
            };
            try {
                body.empresaId = userLogged.empresaId;
                body.usuarioId = userLogged.id;
                body.formaPagamentoId = null;
                const obj = Object.assign(param, body);
                const instance = yield cutsMade_model_1.CutsMade.create(obj);
                yield schedule_model_1.Schedule.update({ confirmado: true }, { where: { id: body.agendamentoId } });
                return response.status(200).json(instance);
            }
            catch (e) {
                return response.status(500).send("Erro ao criar registro");
            }
        });
    }
    print(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = request.body;
                const fonts = {
                    Helvetica: {
                        normal: "Helvetica",
                        bold: "Helvetica-Bold",
                        italics: "Helvetica-Oblique",
                    },
                };
                const docDefinition = {
                    content: [
                        {
                            text: 'Comprovante de pagamento',
                            style: 'header',
                            alignment: 'center'
                        },
                        {
                            text: [
                                `${body.date}`
                            ],
                            style: 'date',
                            bold: false,
                            alignment: 'center'
                        },
                        {
                            text: [
                                'Valor'
                            ],
                            style: 'valueHeader',
                            bold: false,
                        },
                        {
                            text: [
                                `${body.valor}`
                            ],
                            style: 'valueRow',
                            bold: true,
                        },
                        {
                            text: [
                                'Pagador'
                            ],
                            style: 'valueHeader',
                            bold: false,
                        },
                        {
                            text: [
                                `${body.pagador}`
                            ],
                            style: 'valueRow',
                            bold: true,
                        },
                        {
                            text: [
                                'Serviço'
                            ],
                            style: 'valueHeader',
                            bold: false,
                        },
                        {
                            text: [
                                `${body.servico}`
                            ],
                            style: 'valueRow',
                            bold: true,
                        },
                        {
                            text: [],
                            style: 'divider'
                        },
                        {
                            text: [
                                'Assinatura'
                            ],
                            style: 'ass',
                            bold: false,
                        },
                        {
                            text: [
                                '______________________________________'
                            ],
                            style: 'assRow',
                            bold: false,
                        },
                    ],
                    defaultStyle: { font: "Helvetica" },
                    styles: {
                        header: {
                            fontSize: 48,
                            bold: true,
                            alignment: 'justify',
                            color: '#4F4F4F'
                        },
                        date: {
                            fontSize: 20,
                            alignment: 'justify',
                            color: '#4F4F4F',
                            margin: 6,
                        },
                        valueHeader: {
                            fontSize: 20,
                            color: '#4F4F4F',
                            margin: 8,
                            alignment: 'left',
                        },
                        valueRow: {
                            fontSize: 20,
                            bold: true,
                            color: '#202021',
                            margin: 8,
                            alignment: 'left',
                        },
                        divider: {
                            margin: 32,
                        },
                        ass: {
                            fontSize: 8,
                            bold: false,
                            alignment: 'center',
                            color: '#202021',
                        },
                        assRow: {
                            fontSize: 8,
                            bold: false,
                            alignment: 'center',
                            color: '#202021',
                            margin: 10,
                        }
                    }
                };
                const url = yield gerarPdfRelatorio(docDefinition, fonts);
                return response.status(200).json(url);
            }
            catch (e) {
                return response.status(500).send("Erro ao realizar a impressão");
            }
        });
    }
}
exports.default = new CutsMadeController();
function gerarPdfRelatorio(docDefinition, fonts) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                const printer = new pdfmake_1.default(fonts);
                const pdfDoc = printer.createPdfKitDocument(docDefinition);
                const chunks = [];
                let result;
                pdfDoc.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                pdfDoc.on('end', function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        result = Buffer.concat(chunks);
                        const name = `comprovante-pagamento-${new Date().getMilliseconds()}.pdf`;
                        const bucket = 'barberweb/comprovantes';
                        const url = yield (0, aws_1.savePDFS3)(result, 'pdf', name, bucket);
                        resolve(url);
                    });
                });
                pdfDoc.end();
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
exports.gerarPdfRelatorio = gerarPdfRelatorio;
//# sourceMappingURL=cutsMade.controller.js.map