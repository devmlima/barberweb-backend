"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
const client_model_1 = require("./client.model");
const company_model_1 = require("./company.model");
const user_model_1 = require("./user.model");
const sequelize_typescript_1 = require("sequelize-typescript");
const Base_model_1 = require("./Base.model");
const service_model_1 = require("./service.model");
let Schedule = class Schedule extends Base_model_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "Identificador único da tabela",
    }),
    __metadata("design:type", Number)
], Schedule.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "empresa_id",
        comment: "Identificador da empresa",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => company_model_1.Company),
    __metadata("design:type", Number)
], Schedule.prototype, "empresaId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "usuario_id",
        comment: "Identificador do usuário",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    __metadata("design:type", Number)
], Schedule.prototype, "usuarioId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "servico_id",
        comment: "Identificador do serviço",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => service_model_1.Service),
    __metadata("design:type", Number)
], Schedule.prototype, "servicoId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => service_model_1.Service),
    __metadata("design:type", service_model_1.Service)
], Schedule.prototype, "service", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "cliente_id",
        comment: "Identificador do cliente",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => client_model_1.Client),
    __metadata("design:type", Number)
], Schedule.prototype, "clienteId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => client_model_1.Client),
    __metadata("design:type", client_model_1.Client)
], Schedule.prototype, "client", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: true,
        field: "cancelado",
        defaultValue: false,
        comment: "Verifica se o agendamento está cancelado",
    }),
    __metadata("design:type", Boolean)
], Schedule.prototype, "cancelado", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: true,
        field: "confirmado",
        defaultValue: true,
        comment: "Verifica se o agendamento está confirmado, ou seja, foi realizado",
    }),
    __metadata("design:type", Boolean)
], Schedule.prototype, "confirmado", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        field: "hora",
        defaultValue: false,
        comment: "Hora do agendamento",
    }),
    __metadata("design:type", String)
], Schedule.prototype, "hora", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.NUMBER,
        allowNull: false,
        field: "valor",
        comment: "Valor do serviço",
    }),
    __metadata("design:type", Number)
], Schedule.prototype, "valor", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        field: "data_operacao",
        comment: "Data de Operação do registro",
    }),
    __metadata("design:type", String)
], Schedule.prototype, "dataOperacao", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "data_inclusao",
        defaultValue: sequelize_typescript_1.DataType.NOW,
        comment: "Data de inclusão do registro",
    }),
    __metadata("design:type", Date)
], Schedule.prototype, "dataInclusao", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "data_alteracao",
        defaultValue: sequelize_typescript_1.DataType.NOW,
        comment: "Data de alteração do registro",
    }),
    __metadata("design:type", Date)
], Schedule.prototype, "dataAlteracao", void 0);
Schedule = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "schedule",
        timestamps: false,
        schema: "public",
        createdAt: "dataInclusao",
        updatedAt: "dataAlteracao",
    })
], Schedule);
exports.Schedule = Schedule;
//# sourceMappingURL=schedule.model.js.map