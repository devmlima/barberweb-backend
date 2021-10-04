"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Schedule = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _client = require("./client.model");

var _company = require("./company.model");

var _user = require("./user.model");

var _sequelizeTypescript = require("sequelize-typescript");

var _Base = require("./Base.model");

var _service = require("./service.model");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Schedule = (_dec = (0, _sequelizeTypescript.Table)({
  tableName: "schedule",
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
  allowNull: false,
  field: "empresa_id",
  comment: "Identificador da empresa"
}), _dec4 = (0, _sequelizeTypescript.ForeignKey)(function () {
  return _company.Company;
}), _dec5 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.INTEGER,
  allowNull: false,
  field: "usuario_id",
  comment: "Identificador do usuário"
}), _dec6 = (0, _sequelizeTypescript.ForeignKey)(function () {
  return _user.User;
}), _dec7 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.INTEGER,
  allowNull: false,
  field: "servico_id",
  comment: "Identificador do serviço"
}), _dec8 = (0, _sequelizeTypescript.ForeignKey)(function () {
  return _service.Service;
}), _dec9 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.INTEGER,
  allowNull: false,
  field: "cliente_id",
  comment: "Identificador do cliente"
}), _dec10 = (0, _sequelizeTypescript.ForeignKey)(function () {
  return _client.Client;
}), _dec11 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.BOOLEAN,
  allowNull: true,
  field: "cancelado",
  defaultValue: false,
  comment: "Verifica se o agendamento está cancelado"
}), _dec12 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.BOOLEAN,
  allowNull: true,
  field: "confirmado",
  defaultValue: false,
  comment: "Verifica se o agendamento está confirmado, ou seja, foi realizado"
}), _dec13 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.STRING,
  allowNull: true,
  field: "hora",
  defaultValue: false,
  comment: "Hora do agendamento"
}), _dec14 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.STRING,
  allowNull: true,
  field: "data_operacao",
  comment: "Data de Operação do registro"
}), _dec15 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.DATE,
  allowNull: true,
  field: "data_inclusao",
  defaultValue: _sequelizeTypescript.DataType.NOW,
  comment: "Data de inclusão do registro"
}), _dec16 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.DATE,
  allowNull: true,
  field: "data_alteracao",
  defaultValue: _sequelizeTypescript.DataType.NOW,
  comment: "Data de alteração do registro"
}), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseModel) {
  (0, _inherits2.default)(Schedule, _BaseModel);

  var _super = _createSuper(Schedule);

  function Schedule() {
    var _this;

    (0, _classCallCheck2.default)(this, Schedule);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "id", _descriptor, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "empresaId", _descriptor2, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "usuarioId", _descriptor3, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "servicoId", _descriptor4, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "clienteId", _descriptor5, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "cancelado", _descriptor6, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "confirmado", _descriptor7, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "hora", _descriptor8, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "dataOperacao", _descriptor9, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "dataInclusao", _descriptor10, (0, _assertThisInitialized2.default)(_this));
    (0, _initializerDefineProperty2.default)((0, _assertThisInitialized2.default)(_this), "dataAlteracao", _descriptor11, (0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  return Schedule;
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
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "usuarioId", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "servicoId", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "clienteId", [_dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "cancelado", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "confirmado", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "hora", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "dataOperacao", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "dataInclusao", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "dataAlteracao", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Schedule = Schedule;