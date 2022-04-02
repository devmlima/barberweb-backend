"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("../shared/authenticate");
const express_1 = require("express");
const client_controller_1 = __importDefault(require("../controllers/client.controller"));
const ClientRoute = (0, express_1.Router)();
ClientRoute.get('/searchCep', authenticate_1.authMiddleware, authenticate_1.authPermitions, client_controller_1.default.searchCep);
ClientRoute.get('/find', authenticate_1.authMiddleware, authenticate_1.authPermitions, client_controller_1.default.findAll);
ClientRoute.get('/findById/:id', authenticate_1.authMiddleware, authenticate_1.authPermitions, client_controller_1.default.findById);
ClientRoute.put('/update', authenticate_1.authMiddleware, authenticate_1.authPermitions, client_controller_1.default.update);
ClientRoute.delete('/delete/:id', authenticate_1.authMiddleware, authenticate_1.authPermitions, client_controller_1.default.delete);
ClientRoute.post('/create', authenticate_1.authMiddleware, authenticate_1.authPermitions, client_controller_1.default.create);
exports.default = ClientRoute;
//# sourceMappingURL=client.route.js.map