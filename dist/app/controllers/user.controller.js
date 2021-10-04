"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _company = require("../models/company.model");

var _user = require("../models/user.model");

var _database = require("../../database");

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var UserController = /*#__PURE__*/function () {
  function UserController() {
    (0, _classCallCheck2.default)(this, UserController);
  }

  (0, _createClass2.default)(UserController, [{
    key: "find",
    value: function () {
      var _find = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(request, response) {
        var query, user;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = request.query;
                _context.prev = 1;
                _context.next = 4;
                return _user.User.findAll();

              case 4:
                user = _context.sent;
                return _context.abrupt("return", response.status(200).json(user));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", response.status(500).send("Erro ao pesquisar registro"));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));

      function find(_x, _x2) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "findById",
    value: function () {
      var _findById = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(request, response) {
        var id, user;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = (0, _lodash.get)(request, "params.id", null);
                _context2.prev = 1;
                _context2.next = 4;
                return _user.User.findOne({
                  where: {
                    id: id
                  }
                });

              case 4:
                user = _context2.sent;
                return _context2.abrupt("return", response.json(user));

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", response.status(500).send("Erro ao pesquisar registro"));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function findById(_x3, _x4) {
        return _findById.apply(this, arguments);
      }

      return findById;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(request, response) {
        var body;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                body = request.body;
                _context3.prev = 1;
                _context3.next = 4;
                return _user.User.update(body, {
                  where: {
                    id: body.id
                  }
                });

              case 4:
                return _context3.abrupt("return", response.json(true));

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", response.status(500).send("Erro ao atualizar registro"));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 7]]);
      }));

      function update(_x5, _x6) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(request, response) {
        var id, user;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = (0, _lodash.get)(request, "params.id", null);
                _context4.prev = 1;
                _context4.next = 4;
                return _user.User.findOne({
                  where: {
                    id: id
                  }
                });

              case 4:
                user = _context4.sent;
                user.destroy();
                return _context4.abrupt("return", response.status(200).json(true));

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", response.status(500).json("Erro ao excluir registro"));

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 9]]);
      }));

      function _delete(_x7, _x8) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(request, response) {
        var body, params, instance, _instance$generateTok, token, expiresIn;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                body = request.body;
                _context5.prev = 1;
                params = {
                  nome: body.nome,
                  cpf: body.cpf,
                  email: body.email,
                  celular: body.celular,
                  senha: body.senha,
                  dataNascimento: body.dataNascimento,
                  empresaId: body.empresaId
                };
                _context5.next = 5;
                return _user.User.findOne({
                  where: {
                    email: {
                      [_database.Op.iLike]: body.email
                    }
                  }
                });

              case 5:
                instance = _context5.sent;

                if (!instance) {
                  _context5.next = 9;
                  break;
                }

                response.status(401).json("Já existe um usuário cadastrado com o email informado!");
                return _context5.abrupt("return");

              case 9:
                _context5.next = 11;
                return _user.User.create(params);

              case 11:
                instance = _context5.sent;
                _instance$generateTok = instance.generateToken(), token = _instance$generateTok.token, expiresIn = _instance$generateTok.expiresIn;
                return _context5.abrupt("return", response.status(200).json(_objectSpread(_objectSpread({}, instance.json()), {}, {
                  token,
                  expiresIn
                })));

              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5["catch"](1);
                throw new Error("Erro ao criar registro");

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 16]]);
      }));

      function create(_x9, _x10) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(request, response) {
        var body, user, instance, _user$generateToken, token, result;

        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                body = request.body;

                if (body) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return", response.status(400).json("Dados de usuário não informado!"));

              case 3:
                if (body.email) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt("return", response.status(400).json("Email não informado!"));

              case 5:
                if (!body.senha) response.status(400).json("Senha não informada!");
                _context6.next = 8;
                return _user.User.findOne({
                  where: {
                    email: body.email
                  }
                });

              case 8:
                user = _context6.sent;
                if (!user) response.status(400).json("Usuário não encontrado!");

                if (!user.compareSenha(body.senha)) {
                  response.status(400).json("Senha inválida");
                }

                instance = user.json();
                _user$generateToken = user.generateToken(), token = _user$generateToken.token;
                result = _objectSpread(_objectSpread({}, instance), {}, {
                  token
                });
                return _context6.abrupt("return", response.json(result));

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function login(_x11, _x12) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "signUp",
    value: function () {
      var _signUp = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(request, response) {
        var body, company, instanceCompany, params, instance, _instance$generateTok2, token, expiresIn;

        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                body = request.body;
                company = body.empresa;
                _context7.prev = 2;
                _context7.next = 5;
                return _company.Company.findOne({
                  where: {
                    cpfCnpj: {
                      [_database.Op.iLike]: company.cpfCnpj
                    }
                  }
                });

              case 5:
                instanceCompany = _context7.sent;

                if (!instanceCompany) {
                  _context7.next = 9;
                  break;
                }

                response.status(401).json("Já existe uma empresa cadastrada com o documento informado!");
                return _context7.abrupt("return");

              case 9:
                _context7.next = 11;
                return _company.Company.create(company);

              case 11:
                instanceCompany = _context7.sent;
                params = {
                  nome: body.nome,
                  cpf: body.cpf,
                  email: body.email,
                  celular: body.celular,
                  senha: body.senha,
                  dataNascimento: body.dataNascimento,
                  empresaId: instanceCompany.id
                };
                _context7.next = 15;
                return _user.User.findOne({
                  where: {
                    email: {
                      [_database.Op.iLike]: body.email
                    }
                  }
                });

              case 15:
                instance = _context7.sent;

                if (!instance) {
                  _context7.next = 19;
                  break;
                }

                response.status(401).json("Já existe um usuário cadastrado com o documento informado!");
                return _context7.abrupt("return");

              case 19:
                _context7.next = 21;
                return _user.User.create(params);

              case 21:
                instance = _context7.sent;
                _instance$generateTok2 = instance.generateToken(), token = _instance$generateTok2.token, expiresIn = _instance$generateTok2.expiresIn;
                return _context7.abrupt("return", response.status(200).json(_objectSpread(_objectSpread({}, instance.json()), {}, {
                  token,
                  expiresIn
                })));

              case 26:
                _context7.prev = 26;
                _context7.t0 = _context7["catch"](2);
                response.status(400).json("Erro ao criar registro");

              case 29:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[2, 26]]);
      }));

      function signUp(_x13, _x14) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "dataUser",
    value: function () {
      var _dataUser = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(request, response) {
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                console.log("Implementar...");
                return _context8.abrupt("return", response.status(500).json("Rota não implementada"));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function dataUser(_x15, _x16) {
        return _dataUser.apply(this, arguments);
      }

      return dataUser;
    }()
  }]);
  return UserController;
}();

var _default = new UserController();

exports.default = _default;