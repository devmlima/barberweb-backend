"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _tenant = require("./tenant");

var _user = require("../models/user.model");

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var _lodash = require("lodash");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var authMiddleware = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res, next) {
    var token, decoded, user, userModel;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = (0, _lodash.get)(req, "headers.authorization", "").replace("Bearer", "").trim();
            decoded = jwt.decode(token, {
              complete: true
            });
            user = new _user.User();

            if (token) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(401).send("Usuário não autenticado!"));

          case 5:
            userModel = null;

            if (!decoded) {
              _context.next = 10;
              break;
            }

            _context.next = 9;
            return _user.User.findOne({
              where: {
                id: decoded.payload.sub
              }
            });

          case 9:
            userModel = _context.sent;

          case 10:
            if (userModel) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(401).send("Usuário não encontrado!"));

          case 12:
            _context.prev = 12;
            if (decoded) user.validateToken(token, userModel.secret);
            _context.next = 25;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](12);
            _context.t1 = _context.t0.name;
            _context.next = _context.t1 === "TokenExpiredError" ? 21 : _context.t1 === "JsonWebTokenError" ? 22 : _context.t1 === "NotBeforeError" ? 23 : 24;
            break;

          case 21:
            return _context.abrupt("return", res.status(401).send("Token expirado!"));

          case 22:
            return _context.abrupt("return", res.status(401).send("Token mal formado!"));

          case 23:
            return _context.abrupt("return", res.status(401).send("Token ainda não pode ser utilizado!"));

          case 24:
            return _context.abrupt("return", res.status(401).send("Token inválido!"));

          case 25:
            req.headers.userLogged = userModel;
            (0, _tenant.setUserLogged)(userModel);
            next(); // PASSAR FUNÇÃO DE VERIFICAÇÃO DE PERMISSÕES DE ACESSO AQUI

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[12, 16]]);
  }));

  return function authMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.authMiddleware = authMiddleware;