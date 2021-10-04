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

var _state = require("../models/state.model");

var _lodash = require("lodash");

var _database = require("../../database");

var StateController = /*#__PURE__*/function () {
  function StateController() {
    (0, _classCallCheck2.default)(this, StateController);
  }

  (0, _createClass2.default)(StateController, [{
    key: "findAll",
    value: function () {
      var _findAll = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(request, response) {
        var query, where, state;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = request.query;
                where = {};

                if (query && query.descricao) {
                  where.descricao = {
                    [_database.Op.iLike]: `%${query.descricao}%`
                  };
                }

                if (query && query.sigla) {
                  where.sigla = query.sigla;
                }

                _context.prev = 4;
                _context.next = 7;
                return _state.State.findAll({
                  where,
                  limit: 30,
                  offset: 0
                });

              case 7:
                state = _context.sent;
                return _context.abrupt("return", response.status(200).json(state));

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](4);
                return _context.abrupt("return", response.status(500).send("Erro ao pesquisar registro"));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 11]]);
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
        var id, state;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = (0, _lodash.get)(request, 'params.id', null);
                _context2.prev = 1;
                _context2.next = 4;
                return _state.State.findOne({
                  where: {
                    id
                  }
                });

              case 4:
                state = _context2.sent;
                return _context2.abrupt("return", response.status(200).json(state));

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
  }]);
  return StateController;
}();

var _default = new StateController();

exports.default = _default;