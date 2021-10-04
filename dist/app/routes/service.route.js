"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authenticate = require("../shared/authenticate");

var _express = require("express");

var _service = _interopRequireDefault(require("../controllers/service.controller"));

var ServiceRoute = (0, _express.Router)();
ServiceRoute.get('/find', _authenticate.authMiddleware, _service.default.find);
ServiceRoute.get('/findById/:id', _authenticate.authMiddleware, _service.default.findById);
ServiceRoute.put('/update', _authenticate.authMiddleware, _service.default.update);
ServiceRoute.delete('/delete/:id', _authenticate.authMiddleware, _service.default.delete);
ServiceRoute.post('/create', _authenticate.authMiddleware, _service.default.create);
var _default = ServiceRoute;
exports.default = _default;