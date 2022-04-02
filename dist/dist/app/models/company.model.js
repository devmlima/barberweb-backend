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
exports.Company = void 0;
const address_model_1 = require("./address.model");
const sequelize_typescript_1 = require("sequelize-typescript");
const Base_model_1 = require("./Base.model");
let Company = class Company extends Base_model_1.BaseModel {
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
], Company.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: "cpf_cnpj",
        comment: "CPF ou CNPJ da empresa",
    }),
    __metadata("design:type", String)
], Company.prototype, "cpfCnpj", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: "endereco_id",
        comment: "Identificador do endereço da empresa",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => address_model_1.Address),
    __metadata("design:type", Number)
], Company.prototype, "enderecoId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: "razao_social",
        comment: "Razão social da empresa",
    }),
    __metadata("design:type", String)
], Company.prototype, "razaoSocial", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        field: "nome_fantasia",
        comment: "Nome fantasia da empresa",
    }),
    __metadata("design:type", String)
], Company.prototype, "nomeFantasia", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        comment: "Telefone da empresa",
    }),
    __metadata("design:type", String)
], Company.prototype, "telefone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "data_inclusao",
        defaultValue: sequelize_typescript_1.DataType.NOW,
        comment: "Data de inclusão do registro",
    }),
    __metadata("design:type", Date)
], Company.prototype, "dataInclusao", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "data_alteracao",
        defaultValue: sequelize_typescript_1.DataType.NOW,
        comment: "Data de alteração do registro",
    }),
    __metadata("design:type", Date)
], Company.prototype, "dataAlteracao", void 0);
Company = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "company",
        timestamps: false,
        schema: "public",
        createdAt: "dataInclusao",
        updatedAt: "dataAlteracao",
    })
], Company);
exports.Company = Company;
//# sourceMappingURL=company.model.js.map