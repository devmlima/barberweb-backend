"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CutsMade = void 0;
const schedule_model_1 = require("./schedule.model");
const service_model_1 = require("./service.model");
const user_model_1 = require("./user.model");
const client_model_1 = require("./client.model");
const company_model_1 = require("./company.model");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_typescript_2 = require("sequelize-typescript");
const Base_model_1 = require("./Base.model");
const sequelize_typescript_3 = require("sequelize-typescript");
let CutsMade = class CutsMade extends Base_model_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "Identificador único da tabela",
    }),
    __metadata("design:type", Number)
], CutsMade.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: "empresa_id",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => company_model_1.Company),
    __metadata("design:type", Number)
], CutsMade.prototype, "empresaId", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: "usuario_id",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    __metadata("design:type", Number)
], CutsMade.prototype, "usuarioId", void 0);
__decorate([
    (0, sequelize_typescript_3.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], CutsMade.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: "cliente_id",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => client_model_1.Client),
    __metadata("design:type", Number)
], CutsMade.prototype, "clienteId", void 0);
__decorate([
    (0, sequelize_typescript_3.BelongsTo)(() => client_model_1.Client),
    __metadata("design:type", client_model_1.Client)
], CutsMade.prototype, "client", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: "servico_id",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => service_model_1.Service),
    __metadata("design:type", Number)
], CutsMade.prototype, "servicoId", void 0);
__decorate([
    (0, sequelize_typescript_3.BelongsTo)(() => service_model_1.Service),
    __metadata("design:type", service_model_1.Service)
], CutsMade.prototype, "service", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: "agendamento_id",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => schedule_model_1.Schedule),
    __metadata("design:type", Number)
], CutsMade.prototype, "agendamentoId", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: "descricao",
        comment: "Descrição do serviço",
    }),
    __metadata("design:type", String)
], CutsMade.prototype, "descricao", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.NUMBER,
        allowNull: false,
        field: "valor",
        comment: "Valor do serviço",
    }),
    __metadata("design:type", Number)
], CutsMade.prototype, "valor", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.NUMBER,
        allowNull: true,
        field: "forma_pagamento_id",
        comment: "Id do pagamento",
    }),
    __metadata("design:type", Number)
], CutsMade.prototype, "formaPagamentoId", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: true,
        field: "cancelado",
        defaultValue: false,
        comment: "Verifica se o serviço realizado está cancelado",
    }),
    __metadata("design:type", Boolean)
], CutsMade.prototype, "cancelado", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: "data",
        comment: "Data do serviço",
    }),
    __metadata("design:type", String)
], CutsMade.prototype, "data", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        field: "hora",
        defaultValue: false,
        comment: "Hora do agendamento",
    }),
    __metadata("design:type", String)
], CutsMade.prototype, "hora", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "data_inclusao",
        defaultValue: sequelize_typescript_1.DataType.NOW,
        comment: "Data de inclusão do registro",
    }),
    __metadata("design:type", Date)
], CutsMade.prototype, "dataInclusao", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "data_alteracao",
        defaultValue: sequelize_typescript_1.DataType.NOW,
        comment: "Data de alteração do registro",
    }),
    __metadata("design:type", Date)
], CutsMade.prototype, "dataAlteracao", void 0);
CutsMade = __decorate([
    (0, sequelize_typescript_3.Table)({
        tableName: "cortes_realizados",
        timestamps: false,
        schema: "public",
        createdAt: "dataInclusao",
        updatedAt: "dataAlteracao",
    })
], CutsMade);
exports.CutsMade = CutsMade;
//# sourceMappingURL=cutsMade.model.js.map