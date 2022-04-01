"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authenticate_1 = require("../shared/authenticate");
const UserRoute = (0, express_1.Router)();
UserRoute.get('/find', authenticate_1.authMiddleware, user_controller_1.default.find);
UserRoute.get('/findById/:id', authenticate_1.authMiddleware, user_controller_1.default.findById);
UserRoute.get('/verifyToken', authenticate_1.authMiddleware, user_controller_1.default.verifyToken);
UserRoute.get('/dataUser/', authenticate_1.authMiddleware, user_controller_1.default.dataUser);
UserRoute.delete('/delete/:id', authenticate_1.authMiddleware, user_controller_1.default.delete);
UserRoute.put('/update', authenticate_1.authMiddleware, user_controller_1.default.update);
UserRoute.post('/create', authenticate_1.authMiddleware, user_controller_1.default.create);
UserRoute.post('/signUp', user_controller_1.default.signUp);
UserRoute.post('/login', user_controller_1.default.login);
UserRoute.post('/updatePassword', authenticate_1.authMiddleware, user_controller_1.default.updatePassword);
exports.default = UserRoute;
//# sourceMappingURL=user.route.js.map