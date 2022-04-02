"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("../shared/authenticate");
const express_1 = require("express");
const service_controller_1 = __importDefault(require("../controllers/service.controller"));
const ServiceRoute = (0, express_1.Router)();
ServiceRoute.get('/find', authenticate_1.authMiddleware, authenticate_1.authPermitions, service_controller_1.default.find);
ServiceRoute.get('/findById/:id', authenticate_1.authMiddleware, authenticate_1.authPermitions, service_controller_1.default.findById);
ServiceRoute.put('/update', authenticate_1.authMiddleware, authenticate_1.authPermitions, service_controller_1.default.update);
ServiceRoute.delete('/delete/:id', authenticate_1.authMiddleware, authenticate_1.authPermitions, service_controller_1.default.delete);
ServiceRoute.post('/create', authenticate_1.authMiddleware, authenticate_1.authPermitions, service_controller_1.default.create);
exports.default = ServiceRoute;
//# sourceMappingURL=service.route.js.map