"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authenticate = require("../shared/authenticate");

var _express = require("express");

var _client = _interopRequireDefault(require("../controllers/client.controller"));

var ClientRoute = (0, _express.Router)();
ClientRoute.get('/find', _authenticate.authMiddleware, _client.default.findAll);
ClientRoute.get('/findById/:id', _authenticate.authMiddleware, _client.default.findById);
ClientRoute.put('/update', _authenticate.authMiddleware, _client.default.update);
ClientRoute.delete('/delete/:id', _authenticate.authMiddleware, _client.default.delete);
ClientRoute.post('/create', _authenticate.authMiddleware, _client.default.create);
var _default = ClientRoute;
exports.default = _default;