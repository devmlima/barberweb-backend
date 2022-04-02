"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("../shared/authenticate");
const express_1 = require("express");
const address_controller_1 = __importDefault(require("../controllers/address.controller"));
const AddressRoute = (0, express_1.Router)();
AddressRoute.get('/find', authenticate_1.authMiddleware, authenticate_1.authPermitions, address_controller_1.default.findAll);
AddressRoute.get('/findById/:id', authenticate_1.authMiddleware, authenticate_1.authPermitions, address_controller_1.default.findById);
AddressRoute.put('/update', authenticate_1.authMiddleware, authenticate_1.authPermitions, address_controller_1.default.update);
AddressRoute.delete('/delete/:id', authenticate_1.authMiddleware, authenticate_1.authPermitions, address_controller_1.default.delete);
AddressRoute.post('/create', authenticate_1.authMiddleware, authenticate_1.authPermitions, address_controller_1.default.create);
exports.default = AddressRoute;
//# sourceMappingURL=address.route.js.map