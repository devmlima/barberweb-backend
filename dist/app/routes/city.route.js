"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authenticate = require("../shared/authenticate");

var _express = require("express");

var _city = _interopRequireDefault(require("../controllers/city.controller"));

var CityRoute = (0, _express.Router)();
CityRoute.get('/find', _authenticate.authMiddleware, _city.default.findAll);
CityRoute.get('/findById/:id', _authenticate.authMiddleware, _city.default.findById);
var _default = CityRoute;
exports.default = _default;