"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("../shared/authenticate");
const express_1 = require("express");
const company_controller_1 = __importDefault(require("../controllers/company.controller"));
const CompanyRoute = (0, express_1.Router)();
CompanyRoute.get('/find', authenticate_1.authMiddleware, company_controller_1.default.find);
CompanyRoute.get('/findById/:id', authenticate_1.authMiddleware, company_controller_1.default.findById);
CompanyRoute.put('/update', authenticate_1.authMiddleware, company_controller_1.default.update);
CompanyRoute.delete('/delete/:id', authenticate_1.authMiddleware, company_controller_1.default.delete);
CompanyRoute.post('/create', authenticate_1.authMiddleware, company_controller_1.default.create);
exports.default = CompanyRoute;
//# sourceMappingURL=company.route.js.map