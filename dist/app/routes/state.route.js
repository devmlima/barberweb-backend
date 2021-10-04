"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authenticate = require("../shared/authenticate");

var _express = require("express");

var _state = _interopRequireDefault(require("../controllers/state.controller"));

var StateRoute = (0, _express.Router)();
StateRoute.get("/find", _authenticate.authMiddleware, _state.default.findAll);
StateRoute.get("/findById", _authenticate.authMiddleware, _state.default.findById);
var _default = StateRoute;
exports.default = _default;