"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dash_controller_1 = __importDefault(require("../controllers/dash.controller"));
const authenticate_1 = require("../shared/authenticate");
const DashboardRoute = (0, express_1.Router)();
DashboardRoute.get('/cutsAll', authenticate_1.authMiddleware, authenticate_1.authPermitions, dash_controller_1.default.cutsAll);
DashboardRoute.get('/faturamentAll', authenticate_1.authMiddleware, authenticate_1.authPermitions, dash_controller_1.default.faturamentAll);
DashboardRoute.get('/userMonth', authenticate_1.authMiddleware, authenticate_1.authPermitions, dash_controller_1.default.userMonth);
DashboardRoute.get('/faturamentForUser', authenticate_1.authMiddleware, authenticate_1.authPermitions, dash_controller_1.default.faturamentForUser);
DashboardRoute.get('/faturamentLastSevenDays', authenticate_1.authMiddleware, authenticate_1.authPermitions, dash_controller_1.default.faturamentLastSevenDays);
DashboardRoute.get('/servicesMades', authenticate_1.authMiddleware, authenticate_1.authPermitions, dash_controller_1.default.servicesMades);
DashboardRoute.get('/schedules', authenticate_1.authMiddleware, authenticate_1.authPermitions, dash_controller_1.default.schedules);
DashboardRoute.get('/schedulesCanceled', authenticate_1.authMiddleware, authenticate_1.authPermitions, dash_controller_1.default.schedulesCanceled);
// rels
DashboardRoute.get('/relClient', authenticate_1.authMiddleware, authenticate_1.authPermitions, dash_controller_1.default.relClient);
DashboardRoute.get('/relServices', authenticate_1.authMiddleware, authenticate_1.authPermitions, dash_controller_1.default.relServices);
exports.default = DashboardRoute;
//# sourceMappingURL=dash.route.js.map