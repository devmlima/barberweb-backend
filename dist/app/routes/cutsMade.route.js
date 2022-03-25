"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("../shared/authenticate");
const express_1 = require("express");
const cutsMade_controller_1 = __importDefault(require("../controllers/cutsMade.controller"));
const CutsMadeRoute = (0, express_1.Router)();
CutsMadeRoute.get('/find', authenticate_1.authMiddleware, authenticate_1.authPermitions, cutsMade_controller_1.default.find);
CutsMadeRoute.get('/findById/:id', authenticate_1.authMiddleware, authenticate_1.authPermitions, cutsMade_controller_1.default.findById);
CutsMadeRoute.put('/update', authenticate_1.authMiddleware, authenticate_1.authPermitions, cutsMade_controller_1.default.update);
CutsMadeRoute.delete('/delete/:id', authenticate_1.authMiddleware, authenticate_1.authPermitions, cutsMade_controller_1.default.delete);
CutsMadeRoute.post('/create', authenticate_1.authMiddleware, authenticate_1.authPermitions, cutsMade_controller_1.default.create);
exports.default = CutsMadeRoute;
//# sourceMappingURL=cutsMade.route.js.map