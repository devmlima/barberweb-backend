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
exports.Service = void 0;
const company_model_1 = require("./company.model");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_typescript_2 = require("sequelize-typescript");
const Base_model_1 = require("./Base.model");
const sequelize_typescript_3 = require("sequelize-typescript");
let Service = class Service extends Base_model_1.BaseModel {
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
], Service.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: "empresa_id",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => company_model_1.Company),
    __metadata("design:type", Number)
], Service.prototype, "empresaId", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: "descricao",
        comment: "CPF ou CNPJ da empresa",
    }),
    __metadata("design:type", String)
], Service.prototype, "descricao", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "data_inclusao",
        defaultValue: sequelize_typescript_1.DataType.NOW,
        comment: "Data de inclusão do registro",
    }),
    __metadata("design:type", Date)
], Service.prototype, "dataInclusao", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "data_alteracao",
        defaultValue: sequelize_typescript_1.DataType.NOW,
        comment: "Data de alteração do registro",
    }),
    __metadata("design:type", Date)
], Service.prototype, "dataAlteracao", void 0);
Service = __decorate([
    (0, sequelize_typescript_3.Table)({
        tableName: "services",
        timestamps: false,
        schema: "public",
        createdAt: "dataInclusao",
        updatedAt: "dataAlteracao",
    })
], Service);
exports.Service = Service;
//# sourceMappingURL=service.model.js.map