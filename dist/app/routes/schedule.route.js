"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authenticate = require("../shared/authenticate");

var _express = require("express");

var _schedule = _interopRequireDefault(require("../controllers/schedule.controller"));

var ScheduleRoute = (0, _express.Router)();
ScheduleRoute.get('/find', _authenticate.authMiddleware, _schedule.default.findAll);
ScheduleRoute.get('/findById/:id', _authenticate.authMiddleware, _schedule.default.findById);
ScheduleRoute.put('/update', _authenticate.authMiddleware, _schedule.default.update);
ScheduleRoute.delete('/delete/:id', _authenticate.authMiddleware, _schedule.default.delete);
ScheduleRoute.post('/create', _authenticate.authMiddleware, _schedule.default.create);
var _default = ScheduleRoute;
exports.default = _default;