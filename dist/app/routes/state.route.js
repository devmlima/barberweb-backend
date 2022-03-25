"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("../shared/authenticate");
const express_1 = require("express");
const state_controller_1 = __importDefault(require("../controllers/state.controller"));
const StateRoute = (0, express_1.Router)();
StateRoute.get("/find", authenticate_1.authMiddleware, state_controller_1.default.findAll);
StateRoute.get("/findById", authenticate_1.authMiddleware, state_controller_1.default.findById);
exports.default = StateRoute;
//# sourceMappingURL=state.route.js.map