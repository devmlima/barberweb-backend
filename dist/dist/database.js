"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
}) : (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Op = exports.sequelizeAuthenticate = exports.sequelize = void 0;
const cutsMade_model_1 = require("./app/models/cutsMade.model");
const schedule_model_1 = require("./app/models/schedule.model");
const state_model_1 = require("./app/models/state.model");
const profile_model_1 = require("./app/models/profile.model");
const client_model_1 = require("./app/models/client.model");
const city_model_1 = require("./app/models/city.model");
const address_model_1 = require("./app/models/address.model");
const company_model_1 = require("./app/models/company.model");
const user_model_1 = require("./app/models/user.model");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const dotenv = __importStar(require("dotenv"));
const service_model_1 = require("./app/models/service.model");
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
const operatorsAliases = {
    $eq: sequelize_1.Op.eq,
    $ne: sequelize_1.Op.ne,
    $gte: sequelize_1.Op.gte,
    $gt: sequelize_1.Op.gt,
    $lte: sequelize_1.Op.lte,
    $lt: sequelize_1.Op.lt,
    $not: sequelize_1.Op.not,
    $in: sequelize_1.Op.in,
    $notIn: sequelize_1.Op.notIn,
    $is: sequelize_1.Op.is,
    $like: sequelize_1.Op.like,
    $notLike: sequelize_1.Op.notLike,
    $iLike: sequelize_1.Op.iLike,
    $notILike: sequelize_1.Op.notILike,
    $regexp: sequelize_1.Op.regexp,
    $notRegexp: sequelize_1.Op.notRegexp,
    $iRegexp: sequelize_1.Op.iRegexp,
    $notIRegexp: sequelize_1.Op.notIRegexp,
    $between: sequelize_1.Op.between,
    $notBetween: sequelize_1.Op.notBetween,
    $overlap: sequelize_1.Op.overlap,
    $contains: sequelize_1.Op.contains,
    $contained: sequelize_1.Op.contained,
    $adjacent: sequelize_1.Op.adjacent,
    $strictLeft: sequelize_1.Op.strictLeft,
    $strictRight: sequelize_1.Op.strictRight,
    $noExtendRight: sequelize_1.Op.noExtendRight,
    $noExtendLeft: sequelize_1.Op.noExtendLeft,
    $and: sequelize_1.Op.and,
    $or: sequelize_1.Op.or,
    $any: sequelize_1.Op.any,
    $all: sequelize_1.Op.all,
    $values: sequelize_1.Op.values,
    $col: sequelize_1.Op.col,
};
exports.sequelize = new sequelize_typescript_1.Sequelize({
    host: process.env.HOST,
    database: process.env.DATABASE,
    dialect: "postgres",
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    operatorsAliases,
    pool: {
        max: 1,
        min: 0,
        idle: 10000,
        acquire: 10000,
    },
    define: {
        timestamps: false, // true by default
    },
    logQueryParameters: true,
});
exports.sequelize.addModels([
    user_model_1.User,
    company_model_1.Company,
    address_model_1.Address,
    city_model_1.City,
    client_model_1.Client,
    profile_model_1.Profile,
    state_model_1.State,
    service_model_1.Service,
    schedule_model_1.Schedule,
    cutsMade_model_1.CutsMade
]);
const sequelizeAuthenticate = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.sequelize.authenticate();
});
exports.sequelizeAuthenticate = sequelizeAuthenticate;
exports.Op = sequelize_1.Op;
//# sourceMappingURL=database.js.map