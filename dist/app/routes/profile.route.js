"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("../shared/authenticate");
const express_1 = require("express");
const profile_controller_1 = __importDefault(require("../controllers/profile.controller"));
const ProfileRoute = (0, express_1.Router)();
ProfileRoute.get('/find', authenticate_1.authMiddleware, authenticate_1.authPermitions, profile_controller_1.default.findAll);
ProfileRoute.get('/findById/:id', authenticate_1.authMiddleware, authenticate_1.authPermitions, profile_controller_1.default.findById);
ProfileRoute.put('/update', authenticate_1.authMiddleware, authenticate_1.authPermitions, profile_controller_1.default.update);
ProfileRoute.delete('/delete/:id', authenticate_1.authMiddleware, authenticate_1.authPermitions, profile_controller_1.default.delete);
ProfileRoute.post('/create', authenticate_1.authMiddleware, authenticate_1.authPermitions, profile_controller_1.default.create);
exports.default = ProfileRoute;
//# sourceMappingURL=profile.route.js.map