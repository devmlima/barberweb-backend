"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authenticate = require("../shared/authenticate");

var _express = require("express");

var _profile = _interopRequireDefault(require("../controllers/profile.controller"));

var ProfileRoute = (0, _express.Router)();
ProfileRoute.get('/find', _authenticate.authMiddleware, _profile.default.findAll);
ProfileRoute.get('/findById', _authenticate.authMiddleware, _profile.default.findById);
ProfileRoute.put('/update', _authenticate.authMiddleware, _profile.default.update);
ProfileRoute.delete('/delete/:id', _authenticate.authMiddleware, _profile.default.delete);
ProfileRoute.post('/create', _authenticate.authMiddleware, _profile.default.create);
var _default = ProfileRoute;
exports.default = _default;