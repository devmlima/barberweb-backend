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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const crypto = __importStar(require("crypto"));
const jwt = __importStar(require("jsonwebtoken"));
const moment = __importStar(require("moment"));
const sequelize_typescript_1 = require("sequelize-typescript");
const exceptions_1 = require("../shared/exceptions");
const Base_model_1 = require("./Base.model");
const company_model_1 = require("./company.model");
const profile_model_1 = require("./profile.model");
let User = User_1 = class User extends Base_model_1.BaseModel {
    static hashPassword(user, options) {
        return __awaiter(this, void 0, void 0, function* () {
            user.setSenha(user.senha);
            user.secret = crypto.randomBytes(20).toString("hex").substr(0, 6);
        });
    }
    static verificaEmailCadastrado(user, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var where = {
                email: user.email,
            };
            if (user.id) {
                where.id = { $ne: user.id };
            }
            let c = yield User_1.count({ where });
            if (c > 0)
                throw new exceptions_1.HttpException("Já existe um usuário utilizando o email informado!");
            return;
        });
    }
    json() {
        let user = this.toJSON();
        delete user.senha;
        delete user.secret;
        return user;
    }
    setSenha(senhaNova) {
        if (senhaNova.length < 8)
            throw new exceptions_1.HttpException("A senha deve possuir no minimo de 8 caracteres");
        this.senha = crypto.createHmac("sha256", senhaNova).digest("hex");
    }
    compareSenha(senha) {
        return this.senha === crypto.createHmac("sha256", senha).digest("hex");
    }
    generateToken(isApi = false) {
        let token = jwt.sign({ sub: this.id }, process.env.JWT_SECRET + this.secret, {
            expiresIn: "1h",
        });
        const decoded = jwt.decode(token, { complete: true });
        const expiresIn = String(moment.unix(decoded.payload.exp).toDate().getSeconds());
        return {
            token,
            expiresIn,
        };
    }
    generateTokenResetSenha() {
        return jwt.sign({ usr: this.id, res: true }, process.env.JWT_SECRET + this.secret, {
            expiresIn: "1h",
        });
    }
    validateToken(token, secret) {
        return !!jwt.verify(token, process.env.JWT_SECRET + secret);
    }
    validateTokenResetSenha(token) {
        return !!jwt.verify(token, process.env.JWT_SECRET + this.secret);
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "Identificador único da tabela",
    }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: "empresa_id",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => company_model_1.Company),
    __metadata("design:type", Number)
], User.prototype, "empresaId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], User.prototype, "nome", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], User.prototype, "cpf", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], User.prototype, "celular", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], User.prototype, "senha", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], User.prototype, "secret", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        defaultValue: "https://barberweb.s3.amazonaws.com/images/img-padrao.jpeg",
    }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "perfil_id",
        comment: "Identificador do usuário",
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => profile_model_1.Profile),
    __metadata("design:type", Number)
], User.prototype, "perfilId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => profile_model_1.Profile),
    __metadata("design:type", profile_model_1.Profile)
], User.prototype, "profile", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "data_inclusao",
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], User.prototype, "dataInclusao", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
        field: "data_alteracao",
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], User.prototype, "dataAlteracao", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User, Object]),
    __metadata("design:returntype", Promise)
], User, "hashPassword", null);
__decorate([
    sequelize_typescript_1.BeforeSave,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User, Object]),
    __metadata("design:returntype", Promise)
], User, "verificaEmailCadastrado", null);
User = User_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "users",
        timestamps: false,
        schema: "public",
        createdAt: "dataInclusao",
        updatedAt: "dataAlteracao",
    })
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map