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
exports.Address = void 0;
const city_model_1 = require("./city.model");
const state_model_1 = require("./state.model");
const company_model_1 = require("./company.model");
const sequelize_typescript_1 = require("sequelize-typescript");
const Base_model_1 = require("./Base.model");
let Address = class Address extends Base_model_1.BaseModel {
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
], Address.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "empresa_id",
        comment: "Identificador da empresa",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => company_model_1.Company),
    __metadata("design:type", Number)
], Address.prototype, "empresaId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: "rua",
        comment: "Nome da Rua",
    }),
    __metadata("design:type", String)
], Address.prototype, "rua", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: "bairro",
        comment: "Nome do bairro",
    }),
    __metadata("design:type", String)
], Address.prototype, "bairro", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.NUMBER,
        allowNull: false,
        field: "numero",
        comment: "Número do estabelecimento",
    }),
    __metadata("design:type", Number)
], Address.prototype, "numero", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        comment: "CEP da empresa",
    }),
    __metadata("design:type", String)
], Address.prototype, "cep", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "estado_id",
        comment: "Identificador do estado",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => state_model_1.State),
    __metadata("design:type", String)
], Address.prototype, "estadoId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "cidade_id",
        comment: "Identificador da cidade",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => city_model_1.City),
    __metadata("design:type", Number)
], Address.prototype, "cidadeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "data_inclusao",
        defaultValue: sequelize_typescript_1.DataType.NOW,
        comment: "Data de inclusão do registro",
    }),
    __metadata("design:type", Date)
], Address.prototype, "dataInclusao", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "data_alteracao",
        defaultValue: sequelize_typescript_1.DataType.NOW,
        comment: "Data de alteração do registro",
    }),
    __metadata("design:type", Date)
], Address.prototype, "dataAlteracao", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => city_model_1.City),
    __metadata("design:type", city_model_1.City)
], Address.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => state_model_1.State),
    __metadata("design:type", state_model_1.State)
], Address.prototype, "state", void 0);
Address = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "address",
        timestamps: false,
        schema: "public",
        createdAt: "dataInclusao",
        updatedAt: "dataAlteracao",
    })
], Address);
exports.Address = Address;
//# sourceMappingURL=address.model.js.map