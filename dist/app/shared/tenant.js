"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserLogged = exports.clearUserLogged = exports.getUserLogged = void 0;
let userLogged;
const getUserLogged = () => {
    return userLogged;
};
exports.getUserLogged = getUserLogged;
const clearUserLogged = () => {
    userLogged = null;
};
exports.clearUserLogged = clearUserLogged;
const setUserLogged = (user) => {
    userLogged = user;
};
exports.setUserLogged = setUserLogged;
//# sourceMappingURL=tenant.js.map