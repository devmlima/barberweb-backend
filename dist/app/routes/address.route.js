"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authenticate = require("../shared/authenticate");

var _express = require("express");

var _address = _interopRequireDefault(require("../controllers/address.controller"));

var AddressRoute = (0, _express.Router)();
AddressRoute.get('/find', _authenticate.authMiddleware, _address.default.findAll);
AddressRoute.get('/findById/:id', _authenticate.authMiddleware, _address.default.findById);
AddressRoute.put('/update', _authenticate.authMiddleware, _address.default.update);
AddressRoute.delete('/delete/:id', _authenticate.authMiddleware, _address.default.delete);
AddressRoute.post('/create', _authenticate.authMiddleware, _address.default.create);
var _default = AddressRoute;
exports.default = _default;