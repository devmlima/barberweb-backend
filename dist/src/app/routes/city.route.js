"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("../shared/authenticate");
const express_1 = require("express");
const city_controller_1 = __importDefault(require("../controllers/city.controller"));
const CityRoute = (0, express_1.Router)();
CityRoute.get('/find', authenticate_1.authMiddleware, city_controller_1.default.findAll);
CityRoute.get('/findById/:id', authenticate_1.authMiddleware, city_controller_1.default.findById);
exports.default = CityRoute;
//# sourceMappingURL=city.route.js.map