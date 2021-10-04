"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authenticate = require("../shared/authenticate");

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var UserRoute = (0, _express.Router)();
UserRoute.get('/find', _authenticate.authMiddleware, _user.default.find);
UserRoute.get('/findById/:id', _authenticate.authMiddleware, _user.default.findById);
UserRoute.put('/update', _authenticate.authMiddleware, _user.default.update);
UserRoute.delete('/delete/:id', _authenticate.authMiddleware, _user.default.delete);
UserRoute.post('/create', _user.default.create);
UserRoute.post('/signUp', _user.default.signUp);
UserRoute.post('/login', _user.default.login);
UserRoute.get('/dataUser/', _authenticate.authMiddleware, _user.default.findById);
var _default = UserRoute;
exports.default = _default;