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
exports.State = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Base_model_1 = require("./Base.model");
let State = class State extends Base_model_1.BaseModel {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        primaryKey: true,
        comment: "Sigla do estado e identificador único da tabela",
    }),
    __metadata("design:type", String)
], State.prototype, "sigla", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        comment: "Nome completo do estado",
    }),
    __metadata("design:type", String)
], State.prototype, "descricao", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "data_inclusao",
        defaultValue: sequelize_typescript_1.DataType.NOW,
        comment: "Data de inclusão do registro",
    }),
    __metadata("design:type", Date)
], State.prototype, "dataInclusao", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "data_alteracao",
        defaultValue: sequelize_typescript_1.DataType.NOW,
        comment: "Data de alteração do registro",
    }),
    __metadata("design:type", Date)
], State.prototype, "dataAlteracao", void 0);
State = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "state",
        timestamps: false,
        schema: "public",
        createdAt: "dataInclusao",
        updatedAt: "dataAlteracao",
    })
], State);
exports.State = State;
//# sourceMappingURL=state.model.js.map