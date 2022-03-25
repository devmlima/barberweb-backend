"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPermitions = exports.authMiddleware = void 0;
const profile_model_1 = require("./../models/profile.model");
const tenant_1 = require("./tenant");
const user_model_1 = require("../models/user.model");
const jwt = __importStar(require("jsonwebtoken"));
const lodash_1 = require("lodash");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, lodash_1.get)(req, "headers.authorization", "")
        .replace("Bearer", "")
        .trim();
    const decoded = jwt.decode(token, { complete: true });
    const user = new user_model_1.User();
    if (!token)
        return res.status(401).send("Usuário não autenticado!");
    let userModel = null;
    if (decoded) {
        userModel = yield user_model_1.User.findOne({ where: { id: decoded.payload.sub }, include: [profile_model_1.Profile] });
    }
    if (!userModel)
        return res.status(401).send("Usuário não encontrado!");
    try {
        if (decoded)
            user.validateToken(token, userModel.secret);
    }
    catch (e) {
        switch (e.name) {
            case "TokenExpiredError":
                return res.status(401).send("Token expirado!");
            case "JsonWebTokenError":
                return res.status(401).send("Token mal formado!");
            case "NotBeforeError":
                return res.status(401).send("Token ainda não pode ser utilizado!");
            default:
                return res.status(401).send("Token inválido!");
        }
    }
    req.headers.userLogged = userModel;
    req.headers.companyId = userModel.empresaId;
    req.headers.permitions = JSON.parse(userModel.profile.permissoes);
    (0, tenant_1.setUserLogged)(userModel);
    next();
});
exports.authMiddleware = authMiddleware;
const authPermitions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const permitions = req.headers.permitions;
    const route = req.baseUrl.substring(1);
    const permitionsRoute = permitions[route];
    const method = req.method;
    if (method.toLowerCase() !== 'get' && permitionsRoute && !permitionsRoute.writing) {
        return res.send("Você não tem permissão para efetuar alterações!");
    }
    if (method.toLowerCase() === 'get' && permitionsRoute && !permitionsRoute.reading) {
        return res.status(401).send("Você não tem permissão para visualizar esta rotina!");
    }
    if (permitions.client.all && permitions.profile.all && permitions.schedule.all &&
        permitions.service.all && permitions.user.all) {
        req.headers.admin = true;
    }
    else {
        req.headers.admin = false;
    }
    next();
});
exports.authPermitions = authPermitions;
//# sourceMappingURL=authenticate.js.map