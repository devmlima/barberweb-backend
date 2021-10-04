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

var _lodash = require("lodash");

var _database = require("../../database");

var _company = require("../models/company.model");

var CompanyController = /*#__PURE__*/function () {
  function CompanyController() {
    (0, _classCallCheck2.default)(this, CompanyController);
  }

  (0, _createClass2.default)(CompanyController, [{
    key: "find",
    value: function () {
      var _find = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(request, response) {
        var query, where, company;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = request.query;
                where = {};

                if (query && query.id) {
                  where.id = query.id;
                }

                if (query && query.cpfCnpj) {
                  where.cpfCnpj = {
                    [_database.Op.iLike]: `%${query.cpfCnpj}%`
                  };
                }

                if (query && query.razaoSocial) {
                  where.razaoSocial = {
                    [_database.Op.iLike]: `%${query.razaoSocial}%`
                  };
                }

                if (query && query.nomeFantasia) {
                  where.nomeFantasia = {
                    [_database.Op.iLike]: `%${query.nomeFantasia}%`
                  };
                }

                _context.prev = 6;
                _context.next = 9;
                return _company.Company.findAll({
                  where,
                  limit: 30,
                  offset: 0
                });

              case 9:
                company = _context.sent;
                return _context.abrupt("return", response.json(company));

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](6);
                return _context.abrupt("return", response.status(500).send("Erro ao pesquisar registro"));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[6, 13]]);
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
                return _company.Company.findOne({
                  where: {
                    id
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
                return _company.Company.update(body, {
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
        var id, company;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = (0, _lodash.get)(request, "params.id", null);
                _context4.prev = 1;
                _context4.next = 4;
                return _company.Company.findOne({
                  where: {
                    id: id
                  }
                });

              case 4:
                company = _context4.sent;
                company.destroy();
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
        var body, params, company, instance;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                body = request.body;
                _context5.prev = 1;
                params = {
                  cpfCnpj: body.cpfCnpj,
                  enderecoId: body.enderecoId,
                  razaoSocial: body.razaoSocial,
                  nomeFantasia: body.nomeFantasia,
                  telefone: body.telefone
                };
                _context5.next = 5;
                return _company.Company.findOne({
                  where: {
                    cpfCnpj: params.cpfCnpj
                  }
                });

              case 5:
                company = _context5.sent;

                if (!company) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return", response.status(401).json("Empresa já cadastrada!"));

              case 8:
                _context5.next = 10;
                return _company.Company.create(params);

              case 10:
                instance = _context5.sent;
                return _context5.abrupt("return", response.status(200).json(instance));

              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5["catch"](1);
                return _context5.abrupt("return", response.status(500).send("Erro ao criar registro"));

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 14]]);
      }));

      function create(_x9, _x10) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);
  return CompanyController;
}();

var _default = new CompanyController();

exports.default = _default;