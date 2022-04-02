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
exports.BaseModel = void 0;
const tenant_1 = require("../shared/tenant");
const sequelize_typescript_1 = require("sequelize-typescript");
class BaseModel extends sequelize_typescript_1.Model {
    static aplicaTenant(instance) {
        const userLogged = (0, tenant_1.getUserLogged)();
        if (!userLogged) {
            return;
        }
        if (!Array.isArray(instance)) {
            instance = [instance];
        }
        if (this.tenantColumn) {
            for (const item of instance) {
                item[this.tenantColumn] = userLogged.id;
            }
        }
    }
}
__decorate([
    sequelize_typescript_1.BeforeValidate,
    sequelize_typescript_1.BeforeBulkCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BaseModel, "aplicaTenant", null);
exports.BaseModel = BaseModel;
//# sourceMappingURL=Base.model.js.map