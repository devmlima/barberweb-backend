"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUserLogged = exports.clearUserLogged = exports.getUserLogged = void 0;
var userLogged;

var getUserLogged = function getUserLogged() {
  return userLogged;
};

exports.getUserLogged = getUserLogged;

var clearUserLogged = function clearUserLogged() {
  userLogged = null;
};

exports.clearUserLogged = clearUserLogged;

var setUserLogged = function setUserLogged(user) {
  userLogged = user;
};

exports.setUserLogged = setUserLogged;