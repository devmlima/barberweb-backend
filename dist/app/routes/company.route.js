"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authenticate = require("../shared/authenticate");

var _express = require("express");

var _company = _interopRequireDefault(require("../controllers/company.controller"));

var CompanyRoute = (0, _express.Router)();
CompanyRoute.get('/find', _authenticate.authMiddleware, _company.default.find);
CompanyRoute.get('/findById/:id', _authenticate.authMiddleware, _company.default.findById);
CompanyRoute.put('/update', _authenticate.authMiddleware, _company.default.update);
CompanyRoute.delete('/delete/:id', _authenticate.authMiddleware, _company.default.delete);
CompanyRoute.post('/create', _authenticate.authMiddleware, _company.default.create);
var _default = CompanyRoute;
exports.default = _default;