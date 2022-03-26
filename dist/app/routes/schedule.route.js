"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schedule_controller_1 = __importDefault(require("../controllers/schedule.controller"));
const authenticate_1 = require("../shared/authenticate");
const ScheduleRoute = (0, express_1.Router)();
ScheduleRoute.get('/find', authenticate_1.authMiddleware, authenticate_1.authPermitions, schedule_controller_1.default.findAll);
ScheduleRoute.get('/findById/:id', authenticate_1.authMiddleware, authenticate_1.authPermitions, schedule_controller_1.default.findById);
ScheduleRoute.put('/update', authenticate_1.authMiddleware, authenticate_1.authPermitions, schedule_controller_1.default.update);
ScheduleRoute.delete('/delete/:id', authenticate_1.authMiddleware, authenticate_1.authPermitions, schedule_controller_1.default.delete);
ScheduleRoute.post('/create', authenticate_1.authMiddleware, authenticate_1.authPermitions, schedule_controller_1.default.create);
ScheduleRoute.post('/excel', authenticate_1.authMiddleware, authenticate_1.authPermitions, schedule_controller_1.default.excel);
exports.default = ScheduleRoute;
//# sourceMappingURL=schedule.route.js.map