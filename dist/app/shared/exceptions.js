"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForbiddenException = exports.BadRequestException = exports.UnauthorizedException = exports.HttpException = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var HttpException = /*#__PURE__*/function (_Error) {
  (0, _inherits2.default)(HttpException, _Error);

  var _super = _createSuper(HttpException);

  function HttpException(message) {
    var _this;

    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    (0, _classCallCheck2.default)(this, HttpException);
    _this = _super.call(this);
    _this.statusCode = status;
    _this.message = message;
    return _this;
  }

  (0, _createClass2.default)(HttpException, [{
    key: "getStatus",
    value: function getStatus() {
      return this.statusCode;
    }
  }]);
  return HttpException;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));

exports.HttpException = HttpException;

var UnauthorizedException = /*#__PURE__*/function (_HttpException) {
  (0, _inherits2.default)(UnauthorizedException, _HttpException);

  var _super2 = _createSuper(UnauthorizedException);

  function UnauthorizedException() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Acesso não autorizado";
    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 401;
    (0, _classCallCheck2.default)(this, UnauthorizedException);
    return _super2.call(this, message, status);
  }

  return UnauthorizedException;
}(HttpException);

exports.UnauthorizedException = UnauthorizedException;

var BadRequestException = /*#__PURE__*/function (_HttpException2) {
  (0, _inherits2.default)(BadRequestException, _HttpException2);

  var _super3 = _createSuper(BadRequestException);

  function BadRequestException() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Erro ao atender a requisição!";
    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
    (0, _classCallCheck2.default)(this, BadRequestException);
    return _super3.call(this, message, status);
  }

  return BadRequestException;
}(HttpException);

exports.BadRequestException = BadRequestException;

var ForbiddenException = /*#__PURE__*/function (_HttpException3) {
  (0, _inherits2.default)(ForbiddenException, _HttpException3);

  var _super4 = _createSuper(ForbiddenException);

  function ForbiddenException() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Você não tem permissão para acessar este conteúdo!";
    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 403;
    (0, _classCallCheck2.default)(this, ForbiddenException);
    return _super4.call(this, message, status);
  }

  return ForbiddenException;
}(HttpException);

exports.ForbiddenException = ForbiddenException;