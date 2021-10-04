"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _company = require("./company.model");

var _exceptions = require("../shared/exceptions");

var crypto = _interopRequireWildcard(require("crypto"));

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var _sequelizeTypescript = require("sequelize-typescript");

var _Base = require("./Base.model");

var moment = _interopRequireWildcard(require("moment"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var User = (_dec = (0, _sequelizeTypescript.Table)({
  tableName: "users",
  timestamps: false,
  schema: "public",
  createdAt: "dataInclusao",
  updatedAt: "dataAlteracao"
}), _dec2 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.INTEGER,
  allowNull: false,
  autoIncrement: true,
  primaryKey: true,
  comment: "Identificador único da tabela"
}), _dec3 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.INTEGER,
  allowNull: true,
  field: "empresa_id"
}), _dec4 = (0, _sequelizeTypescript.ForeignKey)(function () {
  return _company.Company;
}), _dec5 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.STRING,
  allowNull: true
}), _dec6 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.STRING,
  allowNull: true
}), _dec7 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.STRING,
  allowNull: true
}), _dec8 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.STRING,
  allowNull: true
}), _dec9 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.STRING,
  allowNull: true
}), _dec10 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.STRING,
  allowNull: true
}), _dec11 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.STRING,
  allowNull: true,
  field: "data_nascimento"
}), _dec12 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.DATE,
  allowNull: true,
  field: "data_inclusao",
  defaultValue: _sequelizeTypescript.DataType.NOW
}), _dec13 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.DATE,
  allowNull: true,
  field: "data_alteracao",
  defaultValue: _sequelizeTypescript.DataType.NOW
}), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseModel) {
  (0, _inherits2.default)(User, _BaseModel);

  var _super = _createSuper(User);

  function User() {
    var _this;

    (0, _classCallCheck2.default)(this, User);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "id", _descriptor, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "empresaId", _descriptor2, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "nome", _descriptor3, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "cpf", _descriptor4, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "email", _descriptor5, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "celular", _descriptor6, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "senha", _descriptor7, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "secret", _descriptor8, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "dataNascimento", _descriptor9, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "dataInclusao", _descriptor10, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "dataAlteracao", _descriptor11, (0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(User, [{
    key: "json",
    value: function json() {
      var user = this.toJSON();
      delete user.senha;
      delete user.id;
      delete user.secret;
      return user;
    }
  }, {
    key: "setSenha",
    value: function setSenha(senhaNova) {
      if (senhaNova.length < 8) throw new _exceptions.HttpException("A senha deve possuir no minimo de 8 caracteres");
      this.senha = crypto.createHmac("sha256", senhaNova).digest("hex");
    }
  }, {
    key: "compareSenha",
    value: function compareSenha(senha) {
      return this.senha === crypto.createHmac("sha256", senha).digest("hex");
    }
  }, {
    key: "generateToken",
    value: function generateToken() {
      var isApi = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var token = jwt.sign({
        sub: this.id
      }, process.env.JWT_SECRET + this.secret, {
        expiresIn: "1h"
      });
      var decoded = jwt.decode(token, {
        complete: true
      });
      var expiresIn = String(moment.unix(decoded.payload.exp).toDate().getSeconds());
      return {
        token,
        expiresIn
      };
    }
  }, {
    key: "generateTokenResetSenha",
    value: function generateTokenResetSenha() {
      return jwt.sign({
        usr: this.id,
        res: true
      }, process.env.JWT_SECRET + this.secret, {
        expiresIn: "1h"
      });
    }
  }, {
    key: "validateToken",
    value: function validateToken(token, secret) {
      return !!jwt.verify(token, process.env.JWT_SECRET + secret);
    }
  }, {
    key: "validateTokenResetSenha",
    value: function validateTokenResetSenha(token) {
      return !!jwt.verify(token, process.env.JWT_SECRET + this.secret);
    }
  }], [{
    key: "hashPassword",
    value: function () {
      var _hashPassword = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(user, options) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user.setSenha(user.senha);
                user.secret = crypto.randomBytes(20).toString("hex").substr(0, 6);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function hashPassword(_x, _x2) {
        return _hashPassword.apply(this, arguments);
      }

      return hashPassword;
    }()
  }, {
    key: "verificaEmailCadastrado",
    value: function () {
      var _verificaEmailCadastrado = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(user, options) {
        var where, c;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                where = {
                  email: user.email
                };

                if (user.id) {
                  where.id = {
                    $ne: user.id
                  };
                }

                _context2.next = 4;
                return User.count({
                  where
                });

              case 4:
                c = _context2.sent;

                if (!(c > 0)) {
                  _context2.next = 7;
                  break;
                }

                throw new _exceptions.HttpException("Já existe um usuário utilizando o email informado!");

              case 7:
                return _context2.abrupt("return");

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function verificaEmailCadastrado(_x3, _x4) {
        return _verificaEmailCadastrado.apply(this, arguments);
      }

      return verificaEmailCadastrado;
    }()
  }]);
  return User;
}(_Base.BaseModel), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "id", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "empresaId", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "nome", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "cpf", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "email", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "celular", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "senha", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "secret", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "dataNascimento", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "dataInclusao", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "dataAlteracao", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), (0, _applyDecoratedDescriptor2.default)(_class2, "hashPassword", [_sequelizeTypescript.BeforeCreate], Object.getOwnPropertyDescriptor(_class2, "hashPassword"), _class2), (0, _applyDecoratedDescriptor2.default)(_class2, "verificaEmailCadastrado", [_sequelizeTypescript.BeforeSave], Object.getOwnPropertyDescriptor(_class2, "verificaEmailCadastrado"), _class2)), _class2)) || _class);
exports.User = User;