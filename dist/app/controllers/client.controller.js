"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _client = require("../models/client.model");

var _lodash = require("lodash");

var _database = require("../../database");

var ClientController = /*#__PURE__*/function () {
  function ClientController() {
    (0, _classCallCheck2.default)(this, ClientController);
  }

  (0, _createClass2.default)(ClientController, [{
    key: "findAll",
    value: function () {
      var _findAll = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(request, response) {
        var query, userLogged, where, client;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = request.query;
                userLogged = request.headers.userLogged;
                where = {};
                where.empresaId = userLogged.empresaId;

                if (query && query.id) {
                  where.id = query.id;
                }

                if (query && query.nome) {
                  where.nome = {
                    [_database.Op.iLike]: `%${query.nome}%`
                  };
                }

                if (query && query.cpfCnpj) {
                  where.cpfCnpj = {
                    [_database.Op.iLike]: `%${query.cpfCnpj}%`
                  };
                }

                _context.prev = 7;
                _context.next = 10;
                return _client.Client.findAll({
                  where,
                  limit: 30,
                  offset: 0
                });

              case 10:
                client = _context.sent;
                return _context.abrupt("return", response.status(200).json(client));

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](7);
                return _context.abrupt("return", response.status(500).send("Erro ao pesquisar registro"));

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[7, 14]]);
      }));

      function findAll(_x, _x2) {
        return _findAll.apply(this, arguments);
      }

      return findAll;
    }()
  }, {
    key: "findById",
    value: function () {
      var _findById = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(request, response) {
        var id, client;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = (0, _lodash.get)(request, 'params.id', null);
                _context2.prev = 1;
                _context2.next = 4;
                return _client.Client.findOne({
                  where: {
                    id
                  }
                });

              case 4:
                client = _context2.sent;
                return _context2.abrupt("return", response.status(200).json(client));

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
                return _client.Client.update(body, {
                  where: {
                    id: body.id
                  }
                });

              case 4:
                return _context3.abrupt("return", response.status(200).json(true));

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
        var id, client;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = (0, _lodash.get)(request, "params.id", null);
                _context4.prev = 1;
                _context4.next = 4;
                return _client.Client.findOne({
                  where: {
                    id: id
                  }
                });

              case 4:
                client = _context4.sent;
                client.destroy();
                return _context4.abrupt("return", response.status(200).json(true));

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", response.status(500).send("Erro ao excluir registro"));

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
        var body, userLogged, instance;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                body = request.body;
                userLogged = request.headers.userLogged;
                body.empresaId = userLogged.empresaId;
                _context5.prev = 3;
                _context5.next = 6;
                return _client.Client.create(body);

              case 6:
                instance = _context5.sent;
                return _context5.abrupt("return", response.status(200).json(instance));

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](3);
                return _context5.abrupt("return", response.status(500).send("Erro ao criar registro"));

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[3, 10]]);
      }));

      function create(_x9, _x10) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);
  return ClientController;
}();

var _default = new ClientController();

exports.default = _default;