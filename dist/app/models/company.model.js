"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Company = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _address = require("./address.model");

var _sequelizeTypescript = require("sequelize-typescript");

var _Base = require("./Base.model");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Company = (_dec = (0, _sequelizeTypescript.Table)({
  tableName: "company",
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
  type: _sequelizeTypescript.DataType.STRING,
  allowNull: false,
  field: "cpf_cnpj",
  comment: "CPF ou CNPJ da empresa"
}), _dec4 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.INTEGER,
  allowNull: true,
  field: "endereco_id",
  comment: "Identificador do endereço da empresa"
}), _dec5 = (0, _sequelizeTypescript.ForeignKey)(function () {
  return _address.Address;
}), _dec6 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.STRING,
  allowNull: false,
  field: "razao_social",
  comment: "Razão social da empresa"
}), _dec7 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.STRING,
  allowNull: true,
  field: "nome_fantasia",
  comment: "Nome fantasia da empresa"
}), _dec8 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.STRING,
  allowNull: true,
  comment: "Telefone da empresa"
}), _dec9 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.DATE,
  allowNull: true,
  field: "data_inclusao",
  defaultValue: _sequelizeTypescript.DataType.NOW,
  comment: "Data de inclusão do registro"
}), _dec10 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.DATE,
  allowNull: true,
  field: "data_alteracao",
  defaultValue: _sequelizeTypescript.DataType.NOW,
  comment: "Data de alteração do registro"
}), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseModel) {
  (0, _inherits2.default)(Company, _BaseModel);

  var _super = _createSuper(Company);

  function Company() {
    var _this;

    (0, _classCallCheck2.default)(this, Company);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "id", _descriptor, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "cpfCnpj", _descriptor2, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "enderecoId", _descriptor3, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "razaoSocial", _descriptor4, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "nomeFantasia", _descriptor5, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "telefone", _descriptor6, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "dataInclusao", _descriptor7, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "dataAlteracao", _descriptor8, (0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  return Company;
}(_Base.BaseModel), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "id", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "cpfCnpj", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "enderecoId", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "razaoSocial", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "nomeFantasia", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "telefone", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "dataInclusao", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "dataAlteracao", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Company = Company;